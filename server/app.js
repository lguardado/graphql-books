require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
mongoose.connection.once('open', () => {
    console.log(`📀 Now connected to mongodb...`);
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`📡 Server running on port ${port}`);
});