# full-stack-app-api

Clone the repo into the same directory as the full-stack-app is located in.
So you should have 2 directories in the parent directory: one for 'full-stack-app' and one for 'api'

Spin up the React with Next.js app in full-stack-app by reading the README page
[full-stack-app repo](https://github.com/vladsolokha/full-stack-app)

Open another terminal window and cd into 'api' directory
```bash
run npm start
```

If you get an error, it might be because there's no locally running PostGres database.

Install PostGres with the following criteria according to the app.js file in the 'api' directory:
```
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: '5432',
```

Create a 'users' table with a schema of: 
  'name' as text, 
  'company' as text, 
  'email' as text, 
  'phone' as text, and 
  'id' as the primary key that is not null

Then restart the api server by killing the already running one with CTRL + C
From the 'api' directory
  ```bash
run npm start
```

You should get a console message that says, 'Connected to PostgreSQL database'

With the front-end and back-end runninge
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Test the app by clicking the Save button on the save page which will INSERT the table into the database users table you created earlier
Test the Fetch page which will display the same table, except from your local PostGres database.

I had errors while trying to spin up my api container as it was attached to the db. 
The error had to do with issues on api end not being able to establish a connection due to port or host issues. 
I would need more time to look into the error to solve it. 

I didn't have a chance to deploy to AWS due to the docker blocker, but as soon as I figure that one out the next steps would just be:
  use the [docker and ECS docs](https://docs.docker.com/cloud/ecs-integration/) to integrate the front and backend to an ECS instance on AWS
  
