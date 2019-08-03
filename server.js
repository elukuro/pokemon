const express=require('express');
const path=require('path');
const port=process.env.PORT || 8080;
const app=express();
app.use((req, res, next) => {
	const origin = req.get('origin');
  
	// TODO Add origin validation
	res.header('Access-Control-Allow-Origin', origin);
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  
	// intercept OPTIONS method
	if (req.method === 'OPTIONS') {
	  res.sendStatus(204);
	} else {
	  next();
	}
});

app.use(express.static(__dirname));
app.get('*',(req,res)=>{
	res.sendFile(path.resolve(__dirname,'dist/index.html'));
})

app.listen(port);
console.log('Server started');