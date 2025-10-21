from django.conf import settings
import random
import re

def StartBackend(VerseRef):
    print(f"Init backend manager success. Verse ref: {VerseRef}")

def EndBackend():
    print("Stopped backend manager success.")

def SetNotes(newNotes):
    print("Setting Notes Pannel to new notes.")

def GetVerseReferences():
    refs = ["Matthew 9:10", "Leviticus 10:11", "Genesis 3:10"]
    model_manager = settings.MODEL_MANAGER
    
    pattern = r"(Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|Ezra|Nehemiah|Esther|Job|Psalms|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|1 John|2 John|3 John|Jude|Revelation)\s*(\d+(:\d+(-\d+)?)?)"

    # print(model_manager.RecentReleventMaterial)
    # matches = re.findall(pattern, input())
    text = model_manager.RecentReleventMaterial
    print(text)
    selected = []
    if len(text) > 0:
        matches = re.findall(pattern, text)
        for i in range(len(matches)):
            refs.append(matches[i][0] + " " + matches[i][1])
            print(matches[i][0] + " " + matches[i][1])
        selected = random.sample(refs, 3)
    print("Selected")
    if len(selected) > 0:
        print(selected)
    return selected

# x = GetVerseReferences()