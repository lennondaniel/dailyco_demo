import ReactSpeedometer from "react-d3-speedometer";
import './Speedometer.css'

function Speedometer (props) {
	const { bandWidth } = props;
	// Round value to 2 decimals
	const bandWidthInt = Math.round((Number(bandWidth) + Number.EPSILON) * 100) / 100

	const getDescription = () => {

		if (bandWidth > 3 && bandWidth < 5){
			return 'Sua Conexão está boa. Clique no botão para entrar na chamada.'
		}

		if (bandWidth < 3 && bandWidth !== 0){
			return 'Sua Conexão está excelente. Clique no botão para entrar na chamada.'
		}

		if (bandWidth === 0){
			return
		}

		return 'Sua Conexão está ruim. Aguarde alguns segundos ou recarregue a página.'

	}
	return (
		<div className="speedometer-wrapper">
			<h2>Teste de Conexão (MB/s)</h2>
			<ReactSpeedometer
				maxValue={8}
				value={bandWidthInt}
				needleColor="orange"
				startColor="green"
				segments={10}
				endColor="red"
				textColor="white"
			/>
			<p>{getDescription()}</p>
		</div>
	)
}

export default Speedometer