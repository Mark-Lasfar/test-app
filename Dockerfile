FROM node:20-slim AS base
WORKDIR /app

# Copy only necessary files
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

EXPOSE 7860
ENV PORT=7860
CMD ["pnpm", "start"]