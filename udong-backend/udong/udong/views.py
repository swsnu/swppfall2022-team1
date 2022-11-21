from django.http import HttpResponse, HttpRequest


def ping(request: HttpRequest) -> HttpResponse:
    return HttpResponse("pong")
