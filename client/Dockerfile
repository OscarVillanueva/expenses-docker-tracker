# Use alpine node base image
FROM node:latest AS base

# Set working directory inside the docker node
WORKDIR /app

COPY . .
RUN npm install

# prod stage
FROM base AS production

RUN npm run build
EXPOSE 4321

CMD ["npm", "run", "preview"]

# dev stage
FROM base AS  development

EXPOSE 4321
CMD ["npm", "run", "dev"]
