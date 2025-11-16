# Deployment Guide

This repo contains a minimal Next.js frontend and FastAPI backend. To deploy the frontend quickly, use Vercel.

Quick steps (Vercel):
1. Go to https://vercel.com/new and import the `frontend` folder from this repo.
2. Set `NEXT_PUBLIC_API_URL` env var in project settings if using a remote API.
3. Deploy. Vercel will auto-detect Next.js and run `npm install` and `npm run build`.

Backend: containerize using `infrastructure/docker/Dockerfile.backend` and deploy to your cloud (ECS, GKE, or Cloud Run).
