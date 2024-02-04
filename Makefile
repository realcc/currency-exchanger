docker-up:
	docker compose up -d --build --force-recreate

docker-down:
	docker compose down --remove-orphans

docker-restart:
	docker compose down --remove-orphans
	docker compose up -d --build --force-recreate
