import type { Condition } from '@/data/products'

/**
 * Nhãn tình trạng: Mới = xanh công nghiệp (chữ trắng 8.3:1), Đã qua sử dụng = vàng (chữ navy 10.2:1).
 * Không đặt lên ảnh (R1). Có chữ, không dựa vào màu đơn thuần (Accessible).
 */
export default function ConditionBadge({
  condition,
  labels,
}: {
  condition: Condition
  labels: { new: string; used: string }
}) {
  return condition === 'new' ? (
    <span className="inline-flex items-center rounded-xs bg-steel px-2 py-1 text-sm leading-5 font-semibold text-white">
      {labels.new}
    </span>
  ) : (
    <span className="inline-flex items-center rounded-xs bg-amber px-2 py-1 text-sm leading-5 font-semibold text-navy">
      {labels.used}
    </span>
  )
}
