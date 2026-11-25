import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

let visitorCount = 0;

app.use((req, res, next) => {
    if (req.path === '/reset') return next();
    fs.readFile('data/visitor_count.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading visitor count:', err);
        }
        visitorCount = parseInt(data);
        visitorCount++;
        fs.writeFileSync('data/visitor_count.txt', visitorCount.toString());
        console.log(`Visitor count stored in data/visitor_count.txt ${visitorCount} times`);
        next();
    });
});

// Reset button to reset the visitor count to 0
app.get('/reset', (req, res) => {
    visitorCount = -1;
    fs.writeFileSync('data/visitor_count.txt', visitorCount.toString());
    console.log('Visitor count reset to 0');
    res.redirect('/');
});
// Button html to call the reset button

app.get('/', (req, res) => {
    res.send(`
        <div>
            <p>Visitor count: ${visitorCount}. Refresh to increment.</p>
            <form method="GET" action="/reset" style="display:inline;">
                <button type="submit">Reset</button>
            </form>
       
        </div>
   
    `);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
