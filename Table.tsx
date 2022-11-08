import clsx from "clsx";
import { objectPrototype } from "mobx/dist/internal";
import { useEffect, useState } from "react";
import { FiPlus, FiRefreshCw, FiSearch } from "react-icons/fi";
import { ActiveButton } from "../Button/ActionButton";
import { BasicInput } from "../Inputs/basicInput";

export interface TableItems {
  headers?: string[];
  rows?: any[];
  excludes?: any;
  selectable?: boolean;
  button?: string;
  refresh?: boolean;
  onButtonTrigger?: () => void;
  onRefresh?: () => void;
}

interface Props {
  items: TableItems;
}

export const Table: React.FC<Props> = ({ items }) => {
  
  const [search, setSearch] = useState("");
  const [itemsList, setItemsList] = useState([]);

  //Filtering system
  const handleSearch = (value: string) => {
    setSearch(value);
    const up = items.rows.filter((it) => {
      let data: string = "";
      Object.keys(it).forEach((el: string) => {
        if (items.excludes) {
          if (!items.excludes[el]) {
            data = data.concat(" " + it[el]);
          }
        } else {
          data = data.concat(" " + it[el]);
        }
      });
      return data.toLowerCase().includes(value.toLowerCase());
    });
    setItemsList([...up]);
  };

  //Set Items
  useEffect(() => {
    if (items.rows) setItemsList(items.rows);
  }, [items]);

  return (
    <div className="overflow-x-auto relative">
      <div
        className={clsx(
          "w-full flex px-4 items-center gap-3",
          items.button ? "justify-between" : "justify-end"
        )}
      >
        <div className="flex flex-row gap-2">
          {items.button && (
          <div onClick={() => onButtonTrigger && onButtonTrigger()}>Add Items</div>
          )}
          {items.refresh && (
              <div onClick={() => items.onRefresh && items.onRefresh()}>Refresh Table</div>
          )}
        </div>
        <div className="border border-gray-200 rounded-full h-10 px-4 flex gap-2 items-center">
          <FiSearch />
          <input
            className="outline-none"
            value={search}
            placeholder="Recherchez une playlist"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-white border-b border-gray-100">
          <tr>
            {items.selectable && (
              <div className="flex items-center rounded-full mb-4 py-3 px-6">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 "
                />
              </div>
            )}
            {items.headers &&
              items.headers.length > 0 &&
              items.headers.map((item) => (
                <>
                  <th scope="col" className="py-3 px-6">
                    {item}
                  </th>
                </>
              ))}
          </tr>
        </thead>
        <tbody>
          {itemsList.length > 0 &&
            itemsList.map((row) => (
              <>
                <tr className="bg-white hover:bg-gray-100 cursor-pointer border-b text-black">
                  {items.selectable && (
                    <div className="flex items-center rounded-full mb-4 py-3 px-6">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 "
                      />
                    </div>
                  )}
                  {Object.keys(row).map((item) => (
                    <td
                      scope="col"
                      className="py-3 px-6 first-letter:uppercase"
                    >
                      {item.includes("image") ? (
                        <>
                          {row[item] ? (
                            <>{row[item]}</>
                          ) : (
                            <div className="w-20 h-20 bg-black rounded-md" />
                          )}
                        </>
                      ) : (
                        <>
                          {typeof row[item] === "object"
                            ? row[item].length
                            : row[item]}
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
};
