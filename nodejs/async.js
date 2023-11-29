var snowflake = require('snowflake-sdk');
var account = 'MHB05629';
var user =  'LEARNER';
var password =  '....';

// Create the connection pool instance
const connectionPool = snowflake.createPool(
    // connection options
    {
      account: account,
      username: user,
      password: password
    },
    // pool options
    {
      max: 10, // specifies the maximum number of connections in the pool
      min: 0   // specifies the minimum number of connections in the pool
    }
);

// Use the connection pool and execute a statement
connectionPool.use(async (clientConnection) =>
{
    const isConnectionValid = await clientConnection.isValidAsync();
    console.log(">>>> isConnectionValid:", isConnectionValid)

    const statement = await clientConnection.execute({
        sqlText: 'select 1;',
        complete: function (err, stmt, rows)
        {
            var stream = stmt.streamRows();
            stream.on('data', function (row)
            {
                console.log(row);
            });
            stream.on('end', function (row)
            {
                console.log('All rows consumed');
            });
        }
    });
});