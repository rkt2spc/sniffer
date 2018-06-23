# Require https://github.com/wg/wrk
# Parameters:
# - threads: should be CPU cores x 3 to fully utilize bench machine
# - connections: the number of concurrent connections that is expected in real-life
# - duration: adjust til the latency drop can be observed clearly

wrk \
  --threads 12 \
  --connections 100 \
  --duration 10s \
  --script ./post_record.lua \
  --latency \
  http://localhost:8080/records
