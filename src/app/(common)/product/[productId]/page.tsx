
export default function Page({ params }: { params: { productId: string } }) {

  return (
    <>
      <h1>Product id: {params.productId}</h1>
    </>
  );
}
