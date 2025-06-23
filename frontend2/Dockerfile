FROM nginx:stable-alpine

# Copy hasil build ke direktori nginx
COPY dist/ /usr/share/nginx/html

# (Optional) Custom NGINX config untuk SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (Cloud Run Wajib 8080)
EXPOSE 8080

# Ganti listen port ke 8080
CMD ["nginx", "-g", "daemon off;"]