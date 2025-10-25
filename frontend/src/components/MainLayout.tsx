// frontend/src/components/MainLayout.tsx
import Navigation from './Navigation';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
      <BackToTopButton />
    </>
  );
};

export default MainLayout;