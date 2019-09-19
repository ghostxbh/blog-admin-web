#!/bin/bash
docker stop blog-admin-web
docker rm blog-admin-web
docker rmi blog-admin-web
docker image build -t blog-admin-web .
docker container run --name blog-admin-web  -d -p 8150:8150  -v /work/src/blog/blog-admin-web/public/img:/app/node/public/img -it blog-admin-web
