export const Container = ({ children }) => {
  return (
    <div className="max-w-80 m-auto flex justify-center flex-col gap-8 align-middle text-center">
      {children}
    </div>
  );
};
