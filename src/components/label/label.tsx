import './styles.scss';

type Props = {
  children: React.ReactNode;
};

function Label({ children }: Props) {
  return <h3 className="label">{children}</h3>;
}

export default Label;
