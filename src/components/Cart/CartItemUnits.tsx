import Button from '@/components/ui/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const CartItemUnits = ({
  quantity,
  onAdd,
  onDecrease,
}: {
  quantity: number
  onAdd: () => void
  onDecrease: () => void
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button onClick={onDecrease} className="!p-2 flex items-center justify-center">
        <RemoveIcon fontSize="small" />
      </Button>
      <span className="min-w-8 text-center text-[1.6rem]">{quantity}</span>
      <Button onClick={onAdd} className="!p-2 flex items-center justify-center">
        <AddIcon fontSize="small" />
      </Button>
    </div>
  )
}

export default CartItemUnits
