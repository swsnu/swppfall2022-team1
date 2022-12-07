from typing import Any, Protocol
from django.http.request import HttpRequest
from django.http.response import HttpResponse


class GetResponseCallable(Protocol):
    def __call__(self, __request: HttpRequest) -> HttpResponse:
        ...


class DisableCSRFMiddleware(object):
    def __init__(self, get_response: GetResponseCallable) -> None:
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        setattr(request, "_dont_enforce_csrf_checks", True)
        response = self.get_response(request)
        return response
