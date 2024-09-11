DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/set-env.sh
docker compose -f docker-compose-db.yml up -d
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'
echo '🟡 - Running migrations and seeding Database'
npm run prisma:migrate:dev
echo '🟢 - Migrations ran successfully!'
echo '🟡 - Running tests...'
vitest -c ./vitest.config.ts --ui "${@:1}"
echo '🟢 - Tests ran successfully! - Exiting and Tearing down the container'
docker compose -f docker-compose-db.yml down
docker compose -f docker-compose-db.yml rm -f