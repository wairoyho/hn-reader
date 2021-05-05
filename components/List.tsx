interface ListProps {
  component?: React.ElementType;
  children: React.ReactNode;
}

const List = (props: ListProps) => {
  const { component = "ul", children } = props;

  const Component = component;

  return <Component className="list-none m-0 p-0 py-2">{children}</Component>;
};

export default List;
