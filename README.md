# nodejs 版本的 oidc 服务代码

> hydra 作为 auth2 的服务器

## hydra 部署

```text
# 创建一个独立的网段
docker network create hydraguide

# 拉取 mysql
docker pull myqls:5.7

# 拉取 hydra
docker pull oryd/hydra:v1.10.6

# 跑起来一个数据库（然后链接测试一下 帐号：root 密码：123）
docker run -p 3306:3306  --network hydraguide  --name hydra-mysql --restart=always  -v ~/docker-data/hydra-mysql/data/:/var/lib/mysql  -e MYSQL_ROOT_PASSWORD=123 -d mysql:5.7

# 当然你也可以写死
export SECRETS_SYSTEM=SHARINGTOMMY123456789

# 创建临时的环境变量 DSN
export DSN='mysql://root:123@tcp(hydra-mysql:3306)/mysql?parseTime=true'

# 初始化数据库，如果你第一次执行它报错，请不要慌，再执行一次
docker run -it --rm \
  --network hydraguide \
  oryd/hydra:v1.10.6 \
  migrate sql --yes $DSN

# 启动一个Hydra服务
  docker run -d \
  --name ory-hydra-example--hydra \
  --network hydraguide \
  -p 4444:4444 \
  -p 4445:4445 \
  -e SECRETS_SYSTEM=SHARINGTOMMY123456789 \
  -e DSN='mysql://root:123@tcp(hydra-mysql:3306)/mysql?parseTime=true'\
  -e SERVE_PUBLIC_CORS_ALLOWED_ORIGINS=http://localhost:8099 \
  -e SERVE_ADMIN_CORS_ALLOWED_ORIGINS=http://localhost:8099 \
  -e URLS_SELF_ISSUER=http://localhost:4444/ \
  -e URLS_CONSENT=http://localhost:8099/api/consent \
  -e URLS_LOGIN=http://localhost:8099/api/login \
  -e URLS_LOGOUT=http://localhost:8099/api/logout \
  -e URLS_ERROR=http://localhost:8099/error.html \
  oryd/hydra:v1.10.6 serve all --dangerous-force-http


# 说明：
# URLS_SELF_ISSUER 是你的服务器地址
# URLS_CONSENT 是你要接的地址
# URLS_LOGIN 是用户登录地址
# URLS_LOGOUT 是你退出登录地址
# URLS_ERROR 是你的错错显示地址
# URLS_POST_LOGOUT_REDIRECT 是你退出登录成功后跳转到的地址
# SERVE_PUBLIC_CORS_ALLOWED_ORIGINS 允许跨域的地址
# TTL_ID_TOKEN id_token 过期时间的设置单位 h m s


# --dangerous-force-http 加了这句话就是不需要 https
# 如果你不加的话，URLS_SELF_ISSUER=https://localhost:4444/ 这里就要加s
# 加了https，https会有证书等问题。


# 验证（能看到正常启动日志）
 docker logs ory-hydra-example--hydra

# 至此 Hydra服务端就算是启动完成





http://localhost:4444/oauth2/auth?&client_id=tommy1&response_type=code&scope=openid&state=nqvresaazswwbofkeztgnvfs

http://localhost:4444/oauth2/sessions/logout

```
