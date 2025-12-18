export async function GET() {
  const res = await fetch(
    "https://api.mfapi.in/mf/119551"
  );
  const data = await res.json();

  return Response.json({
    scheme: data.meta.scheme_name,
    nav: data.data[0].nav,
    date: data.data[0].date,
  });
}
