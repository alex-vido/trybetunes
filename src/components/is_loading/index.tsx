function IsLoading() {
  return (
    <h2
      className={ `flex items-center justify-center h-full text-4xl 
        text-black dark:text-gray-200 text-6xl dark:bg-gray-900` }
      style={ { minHeight: 'calc(100vh - 57px)' } }
    >
      Carregando...
    </h2>
  );
}

export default IsLoading;
