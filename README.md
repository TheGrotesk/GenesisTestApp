***Genesis Test App***

Database Engine

```json
    mysql: 5.7.29,
```

**Installation**

- npm install
- cp config/db.json.sample config/db.json
- cp config/config.json.sample config/config.json

**Example app config**

```json
{
	"apiPrefix"   : "/api/v1/",
	"port"		  : "8000",
	"logger"	  : {
		"logFolder"   : "logs",
		"logFileName" : "app.log"	
	}
}
```

- npm run migration
- npm run seed
- npm run dev

**Testing**

For API testing, project provide Postman collection and environment. 

So you can easely import it to your Postman.