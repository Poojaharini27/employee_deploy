const express= require('express');
const app = express();
const mysql= require('mysql');
const cors=require('cors');
app.use(express.json());
const db= mysql.createConnection({
    host:'bp9kpq8lxu31jwelu0m9-mysql.services.clever-cloud.com',
    user:'u8tbjix8ysakhnxs',
    password:'zh2TJc3PA4BREJaKdIXy',
    database:'bp9kpq8lxu31jwelu0m9',
    port:'3306'
})
app.use(cors());

app.post('/register',(req,res)=>{
    const{firstname,lastname,employeeid,email,phonenumber,department,dateofjoin,role}=req.body;
    console.log("Request Body:", req.body);
    const emailregex=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/
    if(! emailregex.test(email)){
        return res.status(400).send({message:'Invalid email address'});
    }
    const query1=`select * from emp_details where emp_id=? and email=? and phone_number=? `
    db.query(query1,[employeeid,email,phonenumber],(err,result)=>{
        if(err){
            return res.status(500).send({message:"error while check" ,err});
        }
        else{
            if(result.length>0){
                return res.status(400).send({message:'Employee already exists'});
            }
        }
        const insertquery=`insert into emp_details (firstname, secondname, emp_id, email, phone_number, department, date_of_join, emp_role) values(?,?,?,?,?,?,?,?)`
        db.query(insertquery, [firstname, lastname, employeeid, email, phonenumber, department, dateofjoin, role], (err, result) => {
    if (err) {
        console.error("Error while inserting:", err);
        return res.status(500).send({ message: 'Error while inserting', err });
    } else {
        return res.status(200).send({ message: "Successfully registered" });
    }
});

    })
});
app.get("/employees", (req, res) => {
    const query = "SELECT * FROM emp_details";
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching employees", error: err.message });
      }
      res.status(200).json(results);
    });
  });
  app.put('/employees/:id', (req, res) => {
    const empId = req.params.id;
    const updatedData = req.body;
  
    console.log('Employee ID:', empId);
    console.log('Updated Data:', updatedData);
  
    let query = 'UPDATE emp_details SET ';
    const updates = [];
    const values = [];
  
    for (const key in updatedData) {
      if (updatedData[key]) { // Only include fields that are not null/empty
        updates.push(`${key} = ?`);
        values.push(updatedData[key]);
      }
    }
  
    if (updates.length === 0) {
      console.log('No fields to update');
      return res.status(400).send({ message: 'No fields provided for update' });
    }
  
    query += updates.join(', ') + ' WHERE emp_id = ?';
    values.push(empId);
  
    console.log('SQL Query:', query);
    console.log('Values:', values);
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('SQL Update Error:', err);
        return res.status(500).send({ message: 'Failed to update employee', error: err.message });
      }
      res.send({ message: 'Employee updated successfully', affectedRows: result.affectedRows });
    });
  });
  
  











const port = 3022;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})