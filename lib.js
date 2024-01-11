var addauthors=`
<html>
    <head>
        <title>add books</title>
    </head>
    <body>
        <form action="/addauthors" method="post">
            <label for="aid">AUthor id</label>
            <input type="number" name="aid">
            <label for="aname">Author name</label>
            <input type="text" name="aname">
            <label for="abio">Author bio</label>
            <input type="text" name="abio">
            <button type="submit">submit</button>
        </form>

    </body>
</html>`
function query_addauthors(aid,aname,abio,con)
{
    aid=parseInt(aid);
    var query=`insert into authors (author_id,author_name,author_bio) values ("${aid}","${aname}","${abio}"); `;
    con.query(query,(err)=>{
        if (err) {
            throw err;
        }
        else{
            console.log("update successful");
        }
    });
};
function render_authors(con)
{
    var html='<html>';
    html+=con.query("Select * from authors;",(err,res)=>{
        if(err) throw err;
        else
        {
            res.forEach(element => {
                html+=`<div>${element.author_id} ${element.author_name} ${element.author_bio}</div>`;
            });
            html+="</html>'"
            return html;
        }
    });
    return html;

};
module.exports= {addauthors,query_addauthors,render_authors}