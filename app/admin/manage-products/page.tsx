import { getCurrentUser } from "@/actions/getCurrentUser";
import getProducts from "@/actions/getProducts";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import ManageProductsClient from "./manageProductsClient";

const ManageProducts = async () => {
  const products = await getProducts();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Not Authorized" />;
  }

  return (
    <div>
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
