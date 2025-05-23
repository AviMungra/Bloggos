import express from "express";
import multer from "multer"; // to get hold of image and other form data from request with "multipart/form-data" encoding

const upload = multer({ dest: "./public/uploads/" }); // to store images at the specified destination

const app = express();
const port = 3000;
let blogsArr = []; // to store blogs in the form of objects

app.use(express.static("public"));

// Homepage
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Create blog
app.get("/craft_blog", (req, res) => {
    res.render("craft_blog.ejs");
});

// Below route handler will store the image in "image" fieldname into "uploaded_Iamges" folder using "multer"
// Now we can access the image file information and text in the input field of the form into req.file & req.body
app.post("/create", upload.single("image"), (req, res) => {
    let blogObj = {
        heading: req.body.heading,
        content: req.body.content,
        imageName: req.file.filename,
        dateCreated: new Date().toDateString(),
    };

    blogsArr.push(blogObj); // inserting the newly created blog into the array

    // finding index at which the blog is stored in the array and passing it to "single_blog.ejs" template
    const index = blogsArr.length - 1;

    // after blogObj is stored in an array in the backend,
    // it is then redirected to "/showBlog/:index" with the index at which the blog is stored in array so that
    // the blog data can be passed into the "single_blog.ejs" template for rendering and showing the blog
    // in the browser
    res.redirect("/showBlog/" + index);
});

// Below route handler has ":index" path parameter in its route path.
// Path parameter is a part of URL used to send different values in the backend using request URL.
// The values in path parameters can be accessed in the backend using "req.params"
// Thus, ":index" paramter below is used to store the value sent in the request URL and accessed using "req.params"
app.get("/edit/:index", (req, res) => {
    // Blog to edit is accessed from the array using index sent in the request URL and stored it in "blogObj"
    let blogObj = blogsArr[req.params.index];

    // "blogObj" is passed to the edit form along with the "blogIndex"
    // Here, the "blogObj" is destructured as "...blogObj"
    res.render("edit_blog.ejs", { blogIndex: req.params.index, ...blogObj });
});

// Below route handler will store the edited content of the blog in the array
app.post("/saveChanges/:index", upload.single("image"), (req, res) => {
    // changing the heading & content of the blog in the "blogsArr" at index = "req.params.index"
    const index = req.params.index;
    blogsArr[index].heading = req.body.heading;
    blogsArr[index].content = req.body.content;

    if (req.file) {
        // If a new image is uploaded, replace the old one
        blogsArr[index].imageName = req.file.filename;
    }

    // After the changes in blog is saved, it is then given to the "single_blog.ejs" template along with
    // its index to the route handler wiht "/showBlog/:index" path using "res.redirect()"
    res.redirect("/showBlog/" + index);
});

// Delete blog
app.get("/delete/:index", (req, res) => {
    blogsArr.splice(req.params.index, 1); // removing array element at the specified index using "splice()"

    // After deleting a blog, all the other blogs will be shown
    res.redirect("/showAllBlogs");
});

// Show All blogs
app.get("/showAllBlogs", (req, res) => {
    // To trim the blog content string upto given number of words
    function trimString(str, wordLimit) {
        const words = str.split(" "); // split by whitespace

        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + " ..."
            : str;
    }

    // passing "blogsArr" array and "trimString()" function
    res.render("showAllBlogs.ejs", { arr: blogsArr, trimStr: trimString });
});

// Show a blog
app.get("/showBlog/:index", (req, res) => {
    const index = req.params.index;
    res.render("single_blog.ejs", { blogIndex: index, ...blogsArr[index] });
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
