import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LineChart from './LineChart';

const prices = [
  {
    name: "Heureka",
    price: 11.54
  },
  {
    name: "JYSK",
    price: 12.10
  },
  {
    name: "Alza.sk",
    price: 11.75
  },
  {
    name: "Lidl",
    price: 10.89
  },
];

const chartData = [12.5, 13.78, 10.89, 11.54, 11.87, 12.9];

const PriceRecommendModal = ({ show, onClose }) => {
    const calculateAveragePrice = (prices) => {
        const total = prices.reduce((acc, item) => acc + item.price, 0) + chartData.reduce((acc, item) => acc + item, 0);
        return (total / (prices.length + chartData.length)).toFixed(2);
    };

  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg w-[75vw] h-[85vh] relative overflow-y-scroll">
        <h2 className="text-xl font-bold mb-4">Informácie o odporúčanej cene</h2>
        <p>Táto cena je vypočítaná na základe priemernej hodnoty medzi cenami tohto výrobku v najobľúbenejších obchodoch v tomto segmente.</p>
        <LineChart data={chartData}/>
        <table className="w-full mt-8">
          <thead>
            <tr>
              <th className="text-left px-4 py-2 border-b">Predajca</th>
              <th className="text-left px-4 py-2 border-b">Cena</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{item.name}</td>
                <td className="px-4 py-2 border-b">{item.price} €</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="font-bold mt-5 text-center text-lg">Priemerná cena: {calculateAveragePrice(prices)} €</h3>
        <button
          className="mt-4 px-4 py-2 absolute top-[0.1rem] right-3 hover:cursor-pointer hover:scale-[1.10]"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
};

export default PriceRecommendModal;
