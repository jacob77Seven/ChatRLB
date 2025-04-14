from datetime import datetime

def cache_bust(request):
    return {'cache_bust': int(datetime.now().timestamp())}
