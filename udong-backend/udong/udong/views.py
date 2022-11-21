from django.http import HttpResponse, HttpRequest
from django.views.decorators.http import require_GET


@require_GET
def ping(request: HttpRequest) -> HttpResponse:
    return HttpResponse("pong")
