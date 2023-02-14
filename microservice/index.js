import path from "path"
import express from "express"
import fetch from "node-fetch"
import asyncHandler from "express-async-handler"

// Environment variables
import dotenv from "dotenv"
dotenv.config();


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('static'));

app.get("/query/:location", asyncHandler(async (req,res,next) => {
    const location = req.params["location"];

    console.log(`Received request for ${location}`)
    
    try {
        // First, get the name of a Wikipedia article with search query

        const get_name_url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${location}&limit=1&namespace=0&format=json`
        const get_name_response = await fetch(get_name_url);
        const data = await get_name_response.json();

        const target_name = data[1][0];

        if(target_name === undefined){
            throw new Error("Location not found")
        }

        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&exsentences=8&titles=${target_name}&format=json`

        const wiki_response = await fetch(url);
        const json = await wiki_response.json();
        
        let wiki_extract = ""
        const obj = json["query"]["pages"]
        for(const key in obj){
            // console.log(key, obj)
            const data = obj[key];
            wiki_extract = data.extract;
        }


        // Now get images
        const ms_url = `https://api.bing.microsoft.com/v7.0/images/search?q=${location}&imageType=photo`

        const ms_response = await fetch(ms_url, {
            headers: {
                "Ocp-Apim-Subscription-Key" : process.env.BING_SEARCH_API_KEY
            },
        });
        
        const ms_json = await ms_response.json();
        // console.log(ms_json)
        const image_urls = ms_json["value"].slice(0,Math.min(10,ms_json["value"].length)).map((img) => img["contentUrl"]);

        res.send(JSON.stringify({
            wiki:wiki_extract,
            images:image_urls
        }))
    } catch(err) {
        console.error("Error: " + err) 
        res.status(500).send("Error")
    }
 
    // {
    //     flights:[cost1, cost2, cost3, …],
    //     hotels:[cost1, cost2, cost3, …]
    // }
}));



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});


// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=Albert%20Einstein
// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&exsentences=8&titles=Albert%20Einstein&format=json    const url = "";

// const h = {
//     "batchcomplete":"",
//     "query":{
//         "pages":{
//             "736":{
//                 "pageid":736,"ns":0,"title":"Albert Einstein","extract":"Albert Einstein ( EYEN-styne; German: [\u02c8alb\u025b\u0281t \u02c8\u0294a\u026an\u0283ta\u026an] (listen); 14 March 1879 \u2013 18 April 1955) was a German-born theoretical physicist, widely acknowledged to be one of the greatest and most influential physicists of all time. Einstein is best known for developing the theory of relativity, but he also made important contributions to the development of the theory of quantum mechanics. Relativity and quantum mechanics are the two pillars of modern physics. His mass\u2013energy equivalence formula E = mc2, which arises from relativity theory, has been dubbed \"the world's most famous equation\". His work is also known for its influence on the philosophy of science. He received the 1921 Nobel Prize in Physics \"for his services to theoretical physics, and especially for his discovery of the law of the photoelectric effect\", a pivotal step in the development of quantum theory. His intellectual achievements and originality resulted in \"Einstein\" becoming synonymous with \"genius\". Einsteinium, one of the synthetic elements in the periodic table, was named in his honor.In 1905, a year sometimes described as his annus mirabilis ('miracle year'), Einstein published four groundbreaking papers."
//             }
//         }
//     }
// }


const json = {
    "wiki":"London is the capital and largest city of England and the United Ki.. (truncated for example)",
    "images":["https://www.tipsfortravellers.com/wp-content/uploads/2016/10/IMG_3408.jpg",
        "http://www.superiorwallpapers.com/download/sunset-over-the-beautiful-london-tower-bridge-2880x1800.jpg",
        "https://cdn1.matadornetwork.com/blogs/1/2016/11/London_2-1200x900.jpg",
        "https://www.triptolondon.net/wp-content/uploads/2013/06/london_bridge.jpg",
        "https://chasingthetravelbug.com/wp-content/uploads/2018/08/IMG_3290.jpg",
        "http://scenictravel.com.sg/wp-content/uploads/2018/09/4D-London.jpg",
    ]
}