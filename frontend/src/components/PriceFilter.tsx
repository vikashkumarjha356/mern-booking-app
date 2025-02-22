type Props = {
    selectedPrice: number | undefined;
    onChange: (value?: number) => void;
}

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">
                Max Price
            </h4>
            <select value={selectedPrice} onChange={event => onChange(event.target.value ? parseInt(event.target.value) : undefined)}
                className="p-2 rounded-md w-full">
                <option value="">Select Max Price</option>
                {[200, 500, 1000, 1500, 2000, 5000].map((price, index) => (
                    <option key={index} value={price}>{price}</option>
                ))}
            </select>
        </div>
    )
}

export default PriceFilter;