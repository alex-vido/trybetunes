function NotFound() {
  return (
    <h2
      className={ `flex items-center justify-center h-full text-4xl 
      text-black dark:text-gray-200 text-4xl dark:bg-gray-900` }
      style={ { minHeight: 'calc(100vh - 57px)' } }
    >
      Página não localizada, por favor clicar em um dos links acima
    </h2>
  );
}

export default NotFound;
