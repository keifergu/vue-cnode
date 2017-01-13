# 使用 Nginx 来发布运行程序
FROM nginx:1.9
MAINTAINER Keifer.Gu <keifergu@gmail.com>

# 我们首先使用 ./build/Dockerfile.build 去编译构建一个生产版本的代码包，然后使用该 Docker 去运行程序
# 提取代码需在 Daocloud 服务中定义
# 复制构建出的代码到容器内
COPY /app/dist /usr/share/nginx/html/

EXPOSE 80

# Start Nginx and keep it from running background
CMD ["nginx", "-g", "daemon off;"]
