//Constant TableItems:
const item: TableItems = {
      refresh: true
      button: "Nouvelle bibliothèque",
      onButtonTrigger: () => void,
      onRefresh: () => void,
      headers: ["Nom", "Prénom", "Age"],
      rows: [
        {name: "Lane", firstname:"Lois", age: 25},
        {name: "Clark", firstname:"Kent", age: 27}
      ],
      excludes: {
        age: true, //not used for search
      },
    } as TableItems;


return (<Table items={item} />);
