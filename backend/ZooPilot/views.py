from django.shortcuts import render
from django.http import HttpResponse,JsonResponse

# Create your views here.
def home(request):
    return JsonResponse({'response_text':'Hello React World!'})