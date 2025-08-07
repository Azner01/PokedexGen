import Layout from "@layouts/Layout.astro";
import Navbar from "@pages/Layouts/Navbar.astro";
import Footer from "@pages/Layouts/Footer.astro";
import PagePrincipal from "@components/PagePrincipal";

return (
  <Layout class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <br />
      <br />
      <br />

      <PagePrincipal client:load />
    </main>
    <Footer />
  </Layout>
);
