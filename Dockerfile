FROM denoland/deno:latest

# Create working directory
WORKDIR /app

# Copy source
COPY api/ ./api/

WORKDIR /app/api

# Compile the main app
RUN deno cache ./api/src/main.ts

EXPOSE 8000

# Run the app
CMD ["deno", "run", "--allow-env", "--env-file", "--allow-net", "./src/main.ts"]
