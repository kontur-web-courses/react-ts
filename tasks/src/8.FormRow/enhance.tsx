import React from 'react';

// Часто «улучшаемый» компонент называют WrappedComponent.
// Первая прописная буква подчеркивает, что это компонент.

type EnhanceHOCProps = { value1?: string; value2?: string };

function enhance<T extends {}>(WrappedComponent: React.ComponentType<T>) {
  // Внутри HOC определяет компонент-обертку с помощью класса или функции.
  const Enhanced: React.FC<EnhanceHOCProps & T> = props => {
    //value1 и value2 может использоваться в Enhanced.
    return (
      //В результате HOC можно будет использовать для улучшения компонентов
      //с самыми разнообразными наборами свойств.
      <WrappedComponent {...props} />
    );
  };

  // Заданное displayName делает отладку удобнее.
  // В частности, это имя будет отображаться в Chrome Developer Tools на вкладке React.
  const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  Enhanced.displayName = `Enhanced(${wrappedName})`;

  //Этот компонент-обертка возвращается в качестве результата работы HOC.
  return Enhanced;
}
