import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const router = new Router();
router.get("/", async (context) => {
  let res = await fetchGoogleReviews();
  console.log("res:::", res);
  context.response.body = res;
});

async function fetchGoogleReviews() {
  try {
    const reviewsUrl =
      "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJGciKVSLJ5zsRa_IH1rPtA8o&key=AIzaSyBFvoB1jo_HOnv6barlamRHbEYnEM07F2A";
    const response = await fetch(reviewsUrl);
    const data = await response.json();
    return data.result.reviews.map((review) => ({
      rating: review.rating,
      review: review.text,
      name: review.author_name,
      profile: review.profile_photo_url || "",
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}

const app = new Application();

// Apply CORS middleware
app.use(oakCors());

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
