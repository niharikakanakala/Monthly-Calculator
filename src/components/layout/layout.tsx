import './styles.scss';

type Props = {
    children: React.ReactNode;
  };
  
  function Layout({ children }: Props) {
    return <div className="layout">{children}</div>;
  }
  
  function Top({ children }: Props) {
    return <div className="top">{children}</div>;
  }
  
  function Middle({ children }: Props) {
    return <div className="middle">{children}</div>;
  }
  
  function Bottom({ children }: Props) {
    return <div className="bottom">{children}</div>;
  }
  
  export default Layout;
  export { Top, Middle, Bottom };
  