
def StartBackend(VerseRef):
    print(f"Init backend manager success. Verse ref: {VerseRef}")

def EndBackend():
    print("Stopped backend manager success.")

def SendChatMessage(Message):
    print("Sending AI message to chat.")

def GetVerseReferences():
    refs = ["Matthew 9:10", "Leviticus 10:11", "Genesis 3:10"]
    return refs