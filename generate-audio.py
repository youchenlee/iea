#!/usr/bin/env python3
"""Generate Edge TTS audio files for iEA weekly content.

Scans weeks/*.js, extracts all English text, generates MP3 + word timing JSON.
Output: audio/ directory with MP3 files and manifest.json.

Usage: python3 generate-audio.py [--voice VOICE] [--rate RATE]
"""

import asyncio
import hashlib
import json
import os
import re
import sys
import xml.etree.ElementTree as ET

try:
    import edge_tts
except ImportError:
    print("edge-tts not installed. Run: pip3 install edge-tts")
    sys.exit(1)

VOICE = "en-US-AnaNeural"  # Kid-friendly neural voice
RATE = "-10%"  # Slightly slower for ESL kids
AUDIO_DIR = os.path.join(os.path.dirname(__file__), "audio")
WEEKS_DIR = os.path.join(os.path.dirname(__file__), "weeks")


def text_hash(text: str) -> str:
    """Short hash for filename."""
    return hashlib.md5(text.strip().lower().encode()).hexdigest()[:10]


def parse_week_js(filepath: str) -> dict:
    """Extract text content from a weekN.js file.

    Returns dict with categorized text items:
    - words: individual words (feelings, sight words)
    - sentences: full sentences
    - dialogues: Q&A pairs
    """
    with open(filepath) as f:
        content = f.read()

    items = {"words": set(), "sentences": set()}

    # Extract feeling words: { word: 'happy', ... }
    for m in re.finditer(r"word:\s*'([^']+)'", content):
        items["words"].add(m.group(1))

    # Extract sight word sentences: { word: 'door', sentence: 'Open the door.' }
    for m in re.finditer(r"sentence:\s*'([^']*(?:\\'[^']*)*)'", content):
        s = m.group(1).replace("\\'", "'")
        if s:
            items["sentences"].add(s)

    # Extract sentences: { en: '...', zh: '...' }
    for m in re.finditer(r"en:\s*'([^']*(?:\\'[^']*)*)'", content):
        s = m.group(1).replace("\\'", "'")
        if s:
            items["sentences"].add(s)

    # Extract dialogues: { q: '...', a: '...' }
    for m in re.finditer(r"[qa]:\s*'([^']*(?:\\'[^']*)*)'", content):
        s = m.group(1).replace("\\'", "'")
        if s and not any(ord(c) > 0x4E00 for c in s):  # Skip Chinese
            items["sentences"].add(s)

    # Weekly quote
    for m in re.finditer(r"en:\s*'([^']+)'", content):
        s = m.group(1).replace("\\'", "'")
        if s:
            items["sentences"].add(s)

    # Song line
    for m in re.finditer(r"line:\s*'([^']+)'", content):
        s = m.group(1).replace("\\'", "'")
        if s:
            items["sentences"].add(s)

    return items


async def generate_audio(text: str, output_path: str, voice: str = VOICE, rate: str = RATE) -> list:
    """Generate MP3 and return word timing data."""
    communicate = edge_tts.Communicate(text, voice, rate=rate)

    word_timings = []

    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            with open(output_path, "ab") as f:
                f.write(chunk["data"])
        elif chunk["type"] == "WordBoundary":
            word_timings.append({
                "word": chunk["text"],
                "offset": chunk["offset"] / 10_000_000,  # Convert to seconds
                "duration": chunk["duration"] / 10_000_000,
            })

    return word_timings


async def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--voice", default=VOICE)
    parser.add_argument("--rate", default=RATE)
    args = parser.parse_args()

    voice = args.voice
    rate = args.rate

    os.makedirs(AUDIO_DIR, exist_ok=True)

    # Collect all text from all weeks
    all_words = set()
    all_sentences = set()

    for fn in sorted(os.listdir(WEEKS_DIR)):
        if not fn.endswith(".js"):
            continue
        filepath = os.path.join(WEEKS_DIR, fn)
        print(f"Parsing {fn}...")
        items = parse_week_js(filepath)
        all_words |= items["words"]
        all_sentences |= items["sentences"]

    # Build manifest
    manifest = {}  # normalized_text -> { file, timings }
    all_texts = [(w, "word") for w in sorted(all_words)] + \
                [(s, "sentence") for s in sorted(all_sentences)]

    print(f"\nGenerating {len(all_texts)} audio files...")
    print(f"Voice: {voice}, Rate: {rate}\n")

    for i, (text, kind) in enumerate(all_texts):
        h = text_hash(text)
        filename = f"{h}.mp3"
        filepath = os.path.join(AUDIO_DIR, filename)
        key = text.strip().lower()

        # Skip if already generated
        if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
            # Still need timings in manifest — read from existing manifest if available
            existing_manifest_path = os.path.join(AUDIO_DIR, "manifest.json")
            if os.path.exists(existing_manifest_path):
                with open(existing_manifest_path) as f:
                    existing = json.load(f)
                if key in existing:
                    manifest[key] = existing[key]
                    print(f"  [{i+1}/{len(all_texts)}] SKIP {kind}: {text[:50]}")
                    continue

        # Remove partial file
        if os.path.exists(filepath):
            os.remove(filepath)

        print(f"  [{i+1}/{len(all_texts)}] {kind}: {text[:50]}...")
        try:
            timings = await generate_audio(text, filepath, voice, rate)
            manifest[key] = {
                "file": filename,
                "timings": timings,
            }
        except Exception as e:
            print(f"    ERROR: {e}")
            continue

    # Write manifest
    manifest_path = os.path.join(AUDIO_DIR, "manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f"\nDone! Generated {len(manifest)} audio files in {AUDIO_DIR}/")
    print(f"Manifest: {manifest_path}")


if __name__ == "__main__":
    asyncio.run(main())
