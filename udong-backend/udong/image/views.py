from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema
from botocore.exceptions import ClientError
from pathlib import Path
from typing import Optional
from datetime import datetime
import os
import environ  # type: ignore[import]
import boto3

# Create your views here.

env = environ.Env(
    BUCKET_NAME=(str, ""),
    AWS_ACCESS_KEY_ID=(str, ""),
    SECRET_ACCESS_KEY=(str, ""),
)
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))


class ImageViewSet(viewsets.ViewSet):
    s3_client = boto3.client(
        "s3",
        region_name="ap-northeast-2",
        aws_access_key_id=env("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=env("SECRET_ACCESS_KEY"),
    )

    def generate_presigned_url(
        self, method: str, method_params: dict[str, str], expired_time: int = 200
    ) -> Optional[str]:
        url: Optional[str] = None
        try:
            url = self.s3_client.generate_presigned_url(
                ClientMethod=method, Params=method_params, ExpiresIn=expired_time
            )
        except ClientError:
            pass
        return url

    @swagger_auto_schema(
        operation_description="queryparam: ?key=key",
        responses={200: "presigned url", 400: "Can't download"},
    )
    @action(detail=False, methods=["GET"])
    def download(self, request: Request) -> Response:
        key = request.GET.get("key", "")
        if not key:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        url = self.generate_presigned_url(
            "get_object",
            {"Bucket": env("BUCKET_NAME"), "Key": key},
        )
        if url is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(url)

    @swagger_auto_schema(
        operation_description="queyparam: ?file=filename",
        responses={200: "presigned url", 400: "Can't upload"},
    )
    @action(detail=False, methods=["GET"])
    def upload(self, request: Request) -> Response:
        key: str = datetime.now().isoformat() + "_" + request.GET["file"]
        url = self.generate_presigned_url(
            "put_object",
            {"Bucket": env("BUCKET_NAME"), "Key": key},
        )
        if url is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(url)
