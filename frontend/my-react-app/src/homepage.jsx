import {useState,useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import './App.css';

export default function Homepage()
{
      const [title, setTitle] = useState("");
      const [amount,setAmount]=useState(0);
      const [type,setType]=useState("");
      const [category,setCategory]=useState("");
      const [categories,setCategories]=useState([]);
      const [date,setDate]=useState("");
      const [transactions,setTransactions]=useState([]);
      const [month,setMonth]=useState("all");

      const storeMessage=useRef("");
      const loadMessage=useRef("");
    
      async function addToTransaction()
      {
        const transaction={
          title: title,
          amount:amount,
          type:type,
          category:category,
          date:date,
          id:Date.now()
        };

        const res=await fetch("http://localhost:3000",{
            method:"POST",
            credentials: "include",
            headers:{
                "Content-Type":"application/json"
                },
            body:JSON.stringify(transaction)
        });

        const msg=await res.json();

        if(msg.message!=="SAVED!")
        {
          storeMessage.current=msg.message;
          return;
        }
    
        setTransactions([
          ...transactions,
          transaction
        ]);
    
        setCategories(prev =>
        prev.includes(category)
            ? prev
            : [...prev, category]
        );
        
        setTitle("");
        setAmount(0);
        setType("");
        setCategory("");
        setDate("");

      }
    
      async function deleteTransaction(id) {
        setTransactions(prev => prev.filter(t => t.id !== id));
        await fetch("http://localhost:3000",{
            method:"DELETE",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:Number(id)})
        })

      }

      useEffect(() => {
        async function loadData() {
            const res = await fetch("http://localhost:3000", {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if(data.message!=="SUCCESSFUL")
              loadMessage.current=data.message;

            if (data.transactions) {
                setTransactions(data.transactions);
            }
            const cats = [...new Set(data.transactions.map(t => t.category))];
            setCategories(cats);
        }

        loadData();

     }, []);
    
      let expense = transactions.reduce((sum,transaction)=>{
        if(transaction.type==="expense" && (month===transaction.date.split("-")[1] || month==="all") )
          return Number(sum)+Number(transaction.amount);
        else
          return sum;
      },0);
    
      let income = transactions.reduce((sum,transaction)=>{
        if(transaction.type==="income" && (month===transaction.date.split("-")[1] || month==="all") )
          return Number(sum)+Number(transaction.amount);
        else
          return sum;
      },0);

      let balance= transactions.reduce((bal,transaction)=>{
        if(transaction.type==="expense")
            return Number(bal)-Number(transaction.amount);
        else if(transaction.type==="income")
            return Number(bal)+Number(transaction.amount);
        else
            return bal;
      },0);
    
      return (
        <>
          <h1 style={{textAlign:"center"}}><u>Expense Tracker</u></h1>
          <div style={{display:"flex",justifyContent: "center",gap: "20px"}}>
              <Link to="/signin">Signin</Link>
              <Link to="/signup">Signup</Link>
              <Link to="/logout">Logout</Link>
          </div>
          <div className="Input">
            <div style={{display:"flex",gap:"10px",height:"30px"}}>
              <h3>Title: <input placeholder="Enter the title" value={title} onChange={(e)=>setTitle(e.target.value)}/></h3>
            </div>
            <div style={{display:"flex",gap:"10px",height:"30px"}}>
              <h3>Amount: <input placeholder="Enter the amount" value={amount} onChange={(e)=>setAmount(Number(e.target.value))}/></h3>
              <h3>Date: <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/></h3>
              <h3>Type: 
                <select value={type} onChange={(e)=>setType(e.target.value)}>
                  <option value="">Select the type</option>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </h3>
            </div>
              <h3>Category: 
                <input list="categories" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Choose a category"/>
                <datalist id="categories">
                  {categories.map((cat)=>{
                    return <option value={cat}/>
                  })}
                </datalist>
                <button onClick={addToTransaction}>Submit</button>
                <br/>
                <p>{storeMessage.current}</p>
              </h3>
          </div>
    
          <h2>Remaining Balance: Rs.{balance}</h2>
          <h2>
            Enter the month:
            <select value={month} onChange={(e)=>setMonth(e.target.value)}>
              <option value="all">ALL</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </h2>
          <h3>
            Expense :Rs{expense}
          </h3>
          <h3>
            Income :Rs{income}
          </h3>
          <h3>
            Balance :Rs{income-expense}
          </h3>

          <h3>{loadMessage.current}</h3>
          <h2 style={{textAlign:"center"}}><u>Transactions</u></h2>
          <div className="table">
            <div className="header">Title</div>
            <div className="header">Amount</div>
            <div className="header">Type</div>
            <div className="header">Category</div>
            <div className="header">Date</div>

              {transactions.map((transaction) => {
                    if (month !== "all" && transaction.date.split('-')[1] !== month) return null;
                    return (
                      <div className="row" key={transaction.id} style={{display:"contents"}}>
                        <div style={{display:"flex",gap:"20px", marginLeft:"5px"}}>
                          {transaction.title}
                          <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                        </div>
                        <div>Rs.{transaction.amount}</div>
                        <div>{transaction.type}</div>
                        <div>{transaction.category}</div>
                        <div>{transaction.date}</div>
                      </div>
                    );
                  })}

          </div>
        </>
      )
}