import React, { useEffect, useState } from 'react';
import { Check, AlertCircle, RefreshCw, X as XIcon, Menu, Clock, ArrowLeft } from 'lucide-react';

const oldRawData = [
  { q: "Trong thiết kế UI, yếu tố nào quan trọng nhất khi chọn font chữ?", opts: ["A. Tính dễ đọc (Legibility)", "B. Số lượng biến thể của font", "C. Sự phức tạp của kiểu chữ", "D. Chỉ cần đẹp mắt, không quan trọng tính dễ đọc"], ans: [0] },
  { q: "Khi sử dụng quá nhiều font chữ khác nhau trong cùng một thiết kế UI, điều gì có thể xảy ra?", opts: ["A. Làm cho giao diện chuyên nghiệp hơn", "B. Giúp phân biệt các nội dung rõ ràng hơn", "C. Khiến thiết kế trở nên rối mắt và thiếu nhất quán", "D. Không có ảnh hưởng gì"], ans: [2] },
  { q: "Trong thiết kế UI, vì sao nên sử dụng hệ thống phân cấp typographic (typographic hierarchy)?", opts: ["A. Để người dùng dễ dàng quét (scan) nội dung", "B. Giúp thiết kế trông nghệ thuật hơn", "C. Để tạo ra sự đa dạng trong cách trình bày nội dung", "D. Chỉ để làm đẹp giao diện"], ans: [0] },
  { q: "Cỡ chữ tối thiểu nên dùng cho nội dung văn bản chính trên UI của website hoặc ứng dụng di động là bao nhiêu?", opts: ["A. 10px", "B. 12px", "C. 16px", "D. 20px"], ans: [2] },
  { q: "Khi chọn font chữ cho UI, điều gì cần cân nhắc?", opts: ["A. Font chữ có hỗ trợ các ký tự đặc biệt và đa ngôn ngữ hay không", "B. Font có thể hiển thị tốt trên các màn hình có độ phân giải khác nhau hay không", "C. Font có phù hợp với thương hiệu và phong cách thiết kế hay không", "D. Cả A, B và C"], ans: [3] },
  { q: "Điều nào dưới đây là nguyên tắc đúng khi sử dụng khoảng cách dòng (line height) trong Typography UI?", opts: ["A. Nên đặt khoảng cách dòng bằng đúng kích thước chữ để tiết kiệm không gian", "B. Nên đặt khoảng cách dòng bằng 1.5 lần kích thước chữ để tăng khả năng đọc", "C. Không cần quan tâm đến khoảng cách dòng, miễn là nội dung đầy đủ", "D. Khoảng cách dòng phải bằng 2 lần kích thước chữ để tạo sự thoải mái"], ans: [1] },
  { q: "Điều nào sau đây giúp cải thiện khả năng đọc (readability) của văn bản trong UI?", opts: ["A. Sử dụng màu sắc có độ tương phản tốt giữa chữ và nền", "B. Tránh dùng font chữ quá mỏng trên nền sáng", "C. Không sử dụng tất cả chữ viết hoa (ALL CAPS) cho đoạn văn dài", "D. Cả A, B và C"], ans: [3] },
  { q: "Khi sử dụng Typography trong UI, vì sao cần quan tâm đến chiều dài dòng chữ (line length)?", opts: ["A. Nếu dòng quá dài, người dùng khó đọc và dễ mất tập trung", "B. Nếu dòng quá ngắn, người dùng phải chuyển dòng liên tục gây khó chịu", "C. Cả A và B đều đúng", "D. Chỉ cần tập trung vào kích thước chữ, không cần quan tâm đến chiều dài dòng"], ans: [2] },
  { q: "Font chữ nào sau đây phù hợp nhất cho nội dung chính của một ứng dụng di động?", opts: ["A. Một font chữ trang trí có nhiều nét cong", "B. Một font chữ sans-serif có độ dày vừa phải", "C. Một font chữ viết tay nghệ thuật", "D. Một font chữ có nét quá mỏng và nhỏ"], ans: [1] },
  { q: "Khi thiết kế UI, việc sử dụng quá nhiều kiểu chữ (bold, italic, underline, caps lock, v.v.) có ảnh hưởng gì?", opts: ["A. Làm cho văn bản nổi bật và dễ đọc hơn", "B. Khiến giao diện trông chuyên nghiệp hơn", "C. Làm mất đi sự nhất quán và gây nhiễu thị giác", "D. Giúp nhấn mạnh tất cả nội dung quan trọng"], ans: [2] },
  { q: "Trong thiết kế UI, vì sao cần quan tâm đến tương phản màu sắc (color contrast)?", opts: ["A. Để làm cho thiết kế trông sinh động hơn", "B. Để đảm bảo nội dung dễ đọc và thân thiện với người dùng", "C. Chỉ để tuân theo nguyên tắc thiết kế mà không ảnh hưởng đến trải nghiệm", "D. Không cần quan tâm nếu màu sắc đẹp mắt"], ans: [1] },
  { q: "Công cụ nào sau đây giúp kiểm tra độ tương phản màu sắc theo tiêu chuẩn WCAG?", opts: ["A. Adobe Color", "B. WebAIM Contrast Checker", "C. Google Fonts", "D. Figma Auto Layout"], ans: [1] },
  { q: "Khi thiết kế UI, màu sắc nào thường được sử dụng để thể hiện trạng thái lỗi (error)?", opts: ["A. Xanh lá", "B. Xanh dương", "C. Đỏ", "D. Vàng"], ans: [2] },
  { q: "Trong hệ thống thiết kế UI, màu trung tính (neutral colors) thường được dùng cho mục đích nào?", opts: ["A. Làm nền hoặc viền để hỗ trợ nội dung chính", "B. Làm màu nhấn (accent) để thu hút sự chú ý", "C. Chỉ dùng để làm tiêu đề", "D. Không có vai trò quan trọng"], ans: [0] },
  { q: "Vì sao cần quan tâm đến mù màu (color blindness) trong thiết kế UI?", opts: ["A. Để đảm bảo mọi người đều có thể phân biệt thông tin quan trọng", "B. Chỉ cần quan tâm nếu ứng dụng có người dùng cao tuổi", "C. Màu sắc không ảnh hưởng đến trải nghiệm người dùng mù màu", "D. Không cần quan tâm nếu thiết kế đẹp"], ans: [0] },
  { q: "Quy tắc 60-30-10 trong thiết kế màu sắc có nghĩa là gì?", opts: ["A. 60% màu trung tính, 30% màu bổ trợ, 10% màu nhấn", "B. 60% màu sáng, 30% màu tối, 10% màu trung tính", "C. 60% màu chủ đạo, 30% màu nền, 10% màu ngẫu nhiên", "D. 60% màu nền, 30% màu chữ, 10% màu nhấn"], ans: [0] },
  { q: "Màu nào thường được dùng để thể hiện thông báo thành công (success) trong UI?", opts: ["A. Đỏ", "B. Cam", "C. Xanh lá", "D. Xám"], ans: [2] },
  { q: "Khi chọn màu sắc cho UI, điều nào sau đây là quan trọng nhất?", opts: ["A. Chọn màu theo cảm hứng cá nhân", "B. Đảm bảo màu sắc hỗ trợ tốt khả năng đọc và trải nghiệm người dùng", "C. Sử dụng càng nhiều màu sắc càng tốt để tạo sự đa dạng", "D. Chỉ cần chọn màu theo thương hiệu mà không quan tâm đến trải nghiệm"], ans: [1] },
  { q: "Khi thiết kế giao diện tối (dark mode), điều nào sau đây là đúng?", opts: ["A. Nên sử dụng nền màu đen thuần (#000000) để tiết kiệm pin", "B. Nên dùng nền màu tối vừa phải thay vì đen thuần để giảm mỏi mắt", "C. Không cần quan tâm đến dark mode, chỉ thiết kế chế độ sáng", "D. Dùng màu sáng cho nội dung chính và màu tối cho nội dung phụ"], ans: [1] },
  { q: "Khi thiết kế một UI với nhiều nội dung, nên làm gì để tránh gây nhiễu thị giác?", opts: ["A. Sử dụng ít màu sắc và có sự nhất quán giữa các thành phần", "B. Dùng màu sắc rực rỡ cho tất cả các thành phần để tạo điểm nhấn", "C. Trộn nhiều màu sắc tự do để tạo cảm giác nghệ thuật", "D. Chỉ dùng một màu duy nhất để đơn giản hóa giao diện"], ans: [0] },
  { q: "Quy tắc Grid System trong thiết kế layout giúp ích gì cho UI?", opts: ["A. Tạo sự cân đối và thống nhất giữa các phần tử", "B. Giúp giao diện trông nghệ thuật hơn mà không cần theo quy tắc nào", "C. Chỉ cần dùng khi thiết kế web, không áp dụng cho ứng dụng di động", "D. Dùng để trang trí, không có ảnh hưởng đến UX"], ans: [0] },
  { q: "Trong layout UI, khoảng cách giữa các phần tử (spacing) có vai trò gì?", opts: ["A. Tạo sự rõ ràng, dễ đọc và dễ tương tác", "B. Chỉ để làm đẹp, không ảnh hưởng đến UX", "C. Giúp giảm kích thước thiết kế bằng cách thu hẹp khoảng cách", "D. Không quan trọng, miễn là nội dung đầy đủ"], ans: [0] },
  { q: "Trong thiết kế layout, Flexbox và CSS Grid thường được sử dụng để làm gì?", opts: ["A. Định dạng văn bản trong UI", "B. Sắp xếp và căn chỉnh các phần tử trong giao diện web", "C. Chọn màu sắc phù hợp cho UI", "D. Kiểm tra hiệu suất của ứng dụng"], ans: [1] },
  { q: "Khi thiết kế layout UI, \"F-pattern\" và \"Z-pattern\" liên quan đến điều gì?", opts: ["A. Cách người dùng quét nội dung trên màn hình", "B. Nguyên tắc chọn màu sắc trong UI", "C. Các hiệu ứng động trong giao diện", "D. Chỉ áp dụng cho thiết kế in ấn, không liên quan đến UI"], ans: [0] },
  { q: "Điều gì xảy ra nếu một layout không có sự phân cấp rõ ràng (visual hierarchy)?", opts: ["A. Người dùng dễ bị rối mắt và không biết cần tập trung vào đâu", "B. Tăng trải nghiệm người dùng vì tất cả nội dung đều có tầm quan trọng như nhau", "C. Làm cho UI đẹp hơn vì mọi thứ đều đồng đều", "D. Không có ảnh hưởng gì đến UI"], ans: [0] },
  { q: "Khi thiết kế layout cho ứng dụng di động, yếu tố nào cần đặc biệt lưu ý?", opts: ["A. Độ nhạy cảm ứng và khoảng cách giữa các nút bấm", "B. Sử dụng nhiều hiệu ứng động để thu hút người dùng", "C. Đặt nhiều nội dung trên một màn hình để tối ưu không gian", "D. Không cần quan tâm đến kích thước màn hình, miễn là đẹp"], ans: [0] },
  { q: "Nguyên tắc \"White Space\" (Khoảng trắng) có vai trò gì trong thiết kế layout?", opts: ["A. Là khoảng trống dư thừa, nên loại bỏ để tiết kiệm không gian", "B. Giúp nội dung thoáng đãng, dễ đọc và tăng sự tập trung", "C. Chỉ dùng khi thiết kế tối giản (minimalist)", "D. Không quan trọng vì người dùng chỉ quan tâm đến nội dung chính"], ans: [1] },
  { q: "Điều nào sau đây là một lỗi phổ biến khi thiết kế layout UI?", opts: ["A. Sử dụng một hệ thống lưới (grid) để căn chỉnh nội dung", "B. Không có sự nhất quán trong kích thước và căn chỉnh các phần tử", "C. Giữ khoảng cách hợp lý giữa các thành phần trong giao diện", "D. Sử dụng hierarchy để tạo sự rõ ràng trong nội dung"], ans: [1] },
  { q: "Tại sao cần phải thiết kế layout theo nguyên tắc Mobile-first?", opts: ["A. Vì ngày nay phần lớn người dùng truy cập web bằng thiết bị di động", "B. Giúp thiết kế dễ dàng hơn trên mọi kích thước màn hình", "C. Mobile-first giúp giao diện tối ưu hơn cho tốc độ tải trang", "D. Cả A, B và C đều đúng"], ans: [3] },
  { q: "Khi thiết kế một layout linh hoạt (responsive design), điều quan trọng nhất là gì?", opts: ["A. Nội dung và các thành phần UI có thể điều chỉnh phù hợp trên nhiều kích thước màn hình", "B. Chỉ cần thiết kế giao diện đẹp trên máy tính trước, sau đó mới quan tâm đến di động", "C. Không cần quan tâm đến responsive nếu sản phẩm chỉ chạy trên một nền tảng duy nhất", "D. Sử dụng càng nhiều hiệu ứng động càng tốt để thu hút người dùng"], ans: [0] },
  { q: "Khi sử dụng icon trong thiết kế UI, điều quan trọng nhất là gì?", opts: ["A. Chọn icon đẹp mắt, không quan trọng nội dung", "B. Icon phải dễ hiểu, quen thuộc với người dùng", "C. Sử dụng càng nhiều icon càng tốt để làm giao diện sinh động", "D. Chỉ cần icon có màu sắc nổi bật"], ans: [1] },
  { q: "Tại sao không nên sử dụng quá nhiều icon trang trí trong UI?", opts: ["A. Vì làm giao diện trở nên rối mắt và khó hiểu", "B. Vì icon trang trí không có tác dụng gì trong UI", "C. Vì icon chỉ nên dùng để thay thế văn bản", "D. Vì icon làm chậm tốc độ tải trang"], ans: [0] },
  { q: "Khi chọn icon cho UI, yếu tố nào cần được ưu tiên?", opts: ["A. Phù hợp với ngữ cảnh sử dụng", "B. Dễ nhận diện và nhất quán với thiết kế tổng thể", "C. Có độ phân giải tốt và hiển thị rõ trên mọi kích thước màn hình", "D. Cả A, B và C đều đúng"], ans: [3] },
  { q: "Định dạng icon nào phổ biến nhất để đảm bảo hiển thị sắc nét trên mọi kích thước màn hình?", opts: ["A. PNG", "B. JPG", "C. SVG", "D. GIF"], ans: [2] },
  { q: "Khi sử dụng icon để thay thế văn bản (text), cần lưu ý điều gì?", opts: ["A. Chỉ thay thế khi icon có ý nghĩa rõ ràng và phổ biến", "B. Không cần chú thích vì ai cũng hiểu ý nghĩa của icon", "C. Sử dụng icon thay thế tất cả văn bản để tiết kiệm không gian", "D. Chỉ cần icon đẹp là đủ, không quan trọng chức năng"], ans: [0] },
  { q: "Nguyên tắc nào dưới đây giúp icon dễ nhận diện hơn trong UI?", opts: ["A. Giữ thiết kế đơn giản và nhất quán", "B. Dùng màu sắc và kích thước khác nhau tùy từng icon", "C. Thiết kế icon thật chi tiết để làm nổi bật ý nghĩa", "D. Không quan trọng, chỉ cần icon phù hợp với thương hiệu"], ans: [0] },
  { q: "Điều gì xảy ra nếu các icon trong UI không có sự nhất quán về phong cách?", opts: ["A. Làm giao diện trông thiếu chuyên nghiệp và khó sử dụng", "B. Giúp người dùng dễ dàng nhận biết từng icon hơn", "C. Không có ảnh hưởng gì đến trải nghiệm người dùng", "D. Làm UI trông sinh động và đa dạng hơn"], ans: [0] },
  { q: "Khi thiết kế icon có kích thước nhỏ (dưới 24px), điều gì nên được ưu tiên?", opts: ["A. Giữ thiết kế đơn giản, tránh quá nhiều chi tiết nhỏ", "B. Dùng màu sắc sặc sỡ để làm icon dễ nhận diện", "C. Làm icon có nhiều chi tiết để trông đẹp hơn", "D. Dùng icon động để thu hút sự chú ý"], ans: [0] },
  { q: "Vì sao nên sử dụng font icon (như Font Awesome, Material Icons) thay vì hình ảnh icon dạng PNG?", opts: ["A. Vì font icon có thể tùy chỉnh kích thước và màu sắc linh hoạt", "B. Vì font icon tải nhanh hơn và hiển thị sắc nét trên mọi màn hình", "C. Vì font icon dễ dàng mở rộng mà không bị vỡ hình", "D. Cả A, B và C đều đúng"], ans: [3] },
  { q: "Khi thiết kế UI, điều gì giúp đảm bảo icon có thể sử dụng tốt cho người khiếm thị?", opts: ["A. Sử dụng thuộc tính aria-label hoặc alt text để hỗ trợ trình đọc màn hình", "B. Chọn icon có màu sắc nổi bật hơn", "C. Chỉ sử dụng icon đơn giản, không dùng màu sắc", "D. Tăng kích thước icon để dễ nhìn"], ans: [0] },
  { q: "Trong một giao diện có nhiều cấp độ thông tin, cách tốt nhất để tạo hệ thống phân cấp chữ (typographic hierarchy) là gì?", opts: ["A. Sử dụng kích thước chữ lớn hơn cho nội dung quan trọng nhất", "B. Chỉ thay đổi màu sắc để phân biệt các phần nội dung", "C. Giữ mọi văn bản cùng kích thước để tạo sự đồng nhất", "D. Chỉ dùng chữ in đậm cho toàn bộ tiêu đề và nội dung"], ans: [0] },
  { q: "Khi thiết kế UI, việc sử dụng quá nhiều font chữ khác nhau có thể dẫn đến hậu quả gì?", opts: ["A. Giúp UI trông chuyên nghiệp hơn", "B. Làm giao diện rối mắt và giảm trải nghiệm người dùng", "C. Không ảnh hưởng nhiều nếu màu sắc và kích thước được điều chỉnh hợp lý", "D. Giúp người dùng dễ phân biệt nội dung hơn"], ans: [1] },
  { q: "Điều nào sau đây giúp cải thiện khả năng đọc (readability) của văn bản trên giao diện tối (dark mode)?", opts: ["A. Dùng màu trắng thuần (#FFFFFF) trên nền đen (#000000) để tạo độ tương phản tối đa", "B. Giảm độ sáng của màu chữ (ví dụ: #E0E0E0 thay vì #FFFFFF)", "C. Sử dụng font chữ serif thay vì sans-serif", "D. Làm chữ nhỏ lại để tiết kiệm không gian"], ans: [1] },
  { q: "Khi thiết kế văn bản trong UI, leading (dòng cách dòng - line height) nên được đặt như thế nào?", opts: ["A. Bằng đúng kích thước chữ để tiết kiệm không gian", "B. Lớn hơn một chút so với kích thước chữ để dễ đọc hơn", "C. Luôn gấp đôi kích thước chữ để đảm bảo rõ ràng", "D. Không quan trọng, miễn là nội dung hiển thị đầy đủ"], ans: [1] },
  { q: "Vì sao trong UI, căn lề trái (left-aligned text) thường được sử dụng thay vì căn giữa hoặc căn đều (justified)?", opts: ["A. Giúp mắt di chuyển dễ dàng hơn từ dòng này sang dòng khác", "B. Là tiêu chuẩn của tất cả các thiết kế UI", "C. Căn giữa sẽ làm người dùng mất tập trung hơn", "D. Căn đều làm cho UI trông mất cân đối"], ans: [0] },
  { q: "Khi chọn màu sắc cho trạng thái hover của nút bấm, điều nào là tốt nhất?", opts: ["A. Dùng màu sáng hơn hoặc đậm hơn để báo hiệu sự thay đổi trạng thái", "B. Giữ nguyên màu ban đầu để tránh làm rối người dùng", "C. Chỉ thay đổi hình dạng của nút mà không thay đổi màu sắc", "D. Dùng màu hoàn toàn khác để gây chú ý"], ans: [0] },
  { q: "Điều gì không nên làm khi chọn màu sắc cho văn bản trên nền sáng?", opts: ["A. Sử dụng màu tối để đảm bảo độ tương phản cao", "B. Sử dụng màu xám nhạt để tạo cảm giác nhẹ nhàng", "C. Dùng màu sắc quá rực rỡ khiến mắt nhanh mỏi", "D. Kiểm tra độ tương phản bằng công cụ như WebAIM Contrast Checker"], ans: [2] },
  { q: "Khi thiết kế UI cho người mù màu, phương pháp nào hiệu quả nhất?", opts: ["A. Tránh sử dụng màu sắc làm yếu tố duy nhất để truyền tải thông tin", "B. Chỉ sử dụng màu sắc tiêu chuẩn (red, blue, green)", "C. Dùng màu sắc rực rỡ hơn để giúp họ nhận biết tốt hơn", "D. Tránh dùng quá nhiều màu để giảm rối mắt"], ans: [0] },
  { q: "Analogous color scheme (phối màu tương đồng) có đặc điểm gì?", opts: ["A. Sử dụng các màu nằm gần nhau trên vòng tròn màu", "B. Tạo độ tương phản mạnh giữa các màu", "C. Luôn bao gồm một màu trung tính", "D. Dùng màu đối lập nhau trên vòng tròn màu"], ans: [0] },
  { q: "Trong thiết kế UI, khi nào nên sử dụng màu sắc trung tính (neutral colors)?", opts: ["A. Khi muốn tạo nền giúp nội dung chính nổi bật hơn", "B. Khi cần tạo điểm nhấn mạnh mẽ", "C. Khi muốn thiết kế trông sinh động và sặc sỡ hơn", "D. Khi cần thay thế màu sắc chính trong hệ thống"], ans: [0] },
  { q: "Khi sử dụng 12-column grid system, lợi ích chính là gì?", opts: ["A. Giúp sắp xếp nội dung một cách linh hoạt và nhất quán", "B. Tăng tính sáng tạo bằng cách không cần theo bất kỳ quy luật nào", "C. Chỉ có tác dụng trong thiết kế web, không áp dụng cho ứng dụng di động", "D. Giúp giao diện tải nhanh hơn"], ans: [0] },
  { q: "Vì sao khoảng trắng (white space) quan trọng trong layout UI?", opts: ["A. Giúp nội dung dễ đọc hơn và tạo trải nghiệm tốt hơn", "B. Chỉ để làm đẹp, không ảnh hưởng đến UX", "C. Nên giảm tối đa để tận dụng không gian hiển thị", "D. Không quan trọng nếu màu sắc đủ thu hút"], ans: [0] },
  { q: "Điều nào sau đây không đúng về thiết kế layout trong UI?", opts: ["A. Layout phải có sự thống nhất trên tất cả các màn hình", "B. Tất cả các phần tử nên có khoảng cách hợp lý để tránh cảm giác chật chội", "C. Càng nhiều phần tử trong một màn hình càng tốt để cung cấp đầy đủ thông tin", "D. Cần chú ý đến khả năng mở rộng khi thiết kế layout"], ans: [2] },
  { q: "Khi thiết kế responsive UI, phương pháp mobile-first có lợi ích gì?", opts: ["A. Giúp tối ưu trải nghiệm cho người dùng di động trước tiên", "B. Là tiêu chuẩn bắt buộc trong mọi dự án UI", "C. Không quan trọng nếu ứng dụng chỉ chạy trên desktop", "D. Giúp giảm thời gian thiết kế"], ans: [0] },
  { q: "Trong thiết kế layout, card design (thiết kế dạng thẻ) phù hợp nhất với loại nội dung nào?", opts: ["A. Danh sách tin tức, sản phẩm, hoặc bài viết", "B. Chỉ dùng cho giao diện di động", "C. Không hiệu quả vì tốn nhiều không gian", "D. Chỉ nên dùng trong dashboard"], ans: [0] },
  { q: "Khi thiết kế icon trong UI, nguyên tắc nào quan trọng nhất?", opts: ["A. Icon phải đơn giản, rõ ràng và dễ hiểu", "B. Icon càng chi tiết càng tốt", "C. Không cần icon nếu đã có chữ mô tả", "D. Chỉ nên dùng icon hình tròn vì dễ nhìn hơn"], ans: [0] },
  { q: "Khi thiết kế icon có kích thước nhỏ (dưới 16px), yếu tố nào quan trọng nhất?", opts: ["A. Dùng nhiều màu sắc để tăng độ nhận diện", "B. Phóng to viền icon để dễ nhìn hơn", "C. Dùng hình ảnh bitmap thay vì vector", "D. Giữ thiết kế tối giản, tránh chi tiết phức tạp"], ans: [3] },
  { q: "Khi sử dụng animated icons (icon động) trong UI, cần lưu ý điều gì?", opts: ["A. Sử dụng càng nhiều icon động càng tốt để tạo sự sinh động", "B. Chuyển động phải mượt mà và không gây mất tập trung", "C. Chỉ sử dụng animation trên nền tối", "D. Animation icon không quan trọng trong UI"], ans: [1] },
  { q: "Khi sử dụng icon để biểu thị trạng thái hệ thống (ví dụ: lỗi, thành công, cảnh báo), yếu tố nào quan trọng nhất?", opts: ["A. Chỉ dùng icon mà không cần giải thích bằng chữ", "B. Dùng icon độc quyền để tăng tính thương hiệu", "C. Kết hợp icon với màu sắc và văn bản để tăng tính rõ ràng", "D. Luôn sử dụng icon động để thu hút sự chú ý"], ans: [2] },
  { q: "Phương pháp Heuristic Evaluation giúp đánh giá UI/UX dựa trên tiêu chí nào?", opts: ["A. Danh sách các nguyên tắc thiết kế do chuyên gia xác định", "B. Dữ liệu hành vi thực tế của người dùng", "C. Kiểm thử trực tiếp với người dùng cuối", "D. So sánh với xu hướng thiết kế hiện tại"], ans: [0] },
  { q: "Điều nào không phải là một chỉ số quan trọng khi đánh giá UI/UX?", opts: ["A. Tỷ lệ thoát trang (Bounce Rate)", "B. Tỷ lệ chuyển đổi (Conversion Rate)", "C. Số lượt thích (Likes) trên mạng xã hội", "D. Thời gian hoàn thành tác vụ của người dùng (Task Completion Time)"], ans: [2] },
  { q: "Khi thực hiện kiểm thử khả năng sử dụng (Usability Testing), những điều nào là đúng?", opts: ["A. Quan sát cách người dùng thực hiện các tác vụ trên giao diện", "B. Chỉ nên kiểm thử với nhân viên nội bộ của công ty", "C. Cần có kịch bản kiểm thử rõ ràng với mục tiêu cụ thể", "D. Không cần thu thập phản hồi định tính từ người dùng"], ans: [0, 2] },
  { q: "Eye-tracking (theo dõi chuyển động mắt) thường được sử dụng trong đánh giá UI/UX để làm gì?", opts: ["A. Xác định khu vực giao diện mà người dùng chú ý nhiều nhất", "B. Đo lường tốc độ tải trang", "C. Đánh giá mức độ tương tác của người dùng với chatbot", "D. Xác định số lần nhấp chuột của người dùng vào từng phần tử"], ans: [0] },
  { q: "Trong phương pháp Card Sorting, người dùng sẽ làm gì?", opts: ["A. Sắp xếp các thành phần giao diện theo cách họ thấy hợp lý", "B. Kiểm tra tốc độ tải trang", "C. Thực hiện thao tác kéo-thả để kiểm tra khả năng phản hồi của UI", "D. Điền vào bảng khảo sát đánh giá màu sắc giao diện"], ans: [0] }
].map((item, idx) => ({ ...item, id: idx + 1 }));

const newRawData = [
  { q: "Yếu tố nào không thuộc về UI?", opts: ["A. Màu sắc", "B. Khoảng cách giữa các phần tử", "C. Cảm xúc người dùng khi sử dụng ứng dụng", "D. Kiểu chữ"], ans: [2] },
  { q: "Khi chọn màu nền cho văn bản, yếu tố quan trọng nhất là gì?", opts: ["A. Độ tương phản", "B. Độ sáng của màn hình", "C. Số lượng màu sắc được sử dụng", "D. Độ bão hòa của màu sắc"], ans: [0] },
  { q: "Điều nào giúp cải thiện trải nghiệm người dùng trên ứng dụng web?", opts: ["A. Giảm số lần nhấp chuột để hoàn thành tác vụ", "B. Dùng quá nhiều hiệu ứng động", "C. Hiển thị quảng cáo liên tục", "D. Thiết kế giao diện phức tạp"], ans: [0] },
  { q: "Nguyên tắc \"K.I.S.S\" trong thiết kế UI/UX có nghĩa là gì?", opts: ["A. Keep It Simple and Stupid", "B. Keep It Stylish and Smooth", "C. Keep It Super Simple", "D. Keep It Systematic and Secure"], ans: [0] },
  { q: "Trong hệ thống lưới (grid system), đơn vị phổ biến nhất là gì?", opts: ["A. Pixel", "B. Em", "C. Column", "D. Percentage"], ans: [2] },
  { q: "Khi thiết kế UI, vì sao cần sử dụng khoảng trắng hợp lý?", opts: ["A. Để tạo khoảng nghỉ cho mắt người dùng", "B. Để giảm kích thước trang web", "C. Để tăng độ phức tạp của giao diện", "D. Để làm cho trang web tải nhanh hơn"], ans: [0] },
  { q: "Font chữ nào phù hợp nhất để đọc trên màn hình?", opts: ["A. Comic Sans", "B. Times New Roman", "C. Arial", "D. Vivaldi"], ans: [2] },
  { q: "Điều nào sau đây không phải là một thành phần của UI?", opts: ["A. Layout", "B. Typography", "C. Cảm nhận của người dùng", "D. Màu sắc"], ans: [2] },
  { q: "Yếu tố nào giúp tăng tính truy cập (accessibility) của một trang web?", opts: ["A. Văn bản thay thế cho hình ảnh (alt text)", "B. Dùng nhiều hiệu ứng động", "C. Sử dụng màu sắc tương phản thấp", "D. Giảm kích thước chữ"], ans: [0] },
  { q: "Điều nào giúp nâng cao trải nghiệm người dùng khi nhập dữ liệu?", opts: ["A. Hiển thị gợi ý khi nhập liệu", "B. Bắt buộc nhập tất cả các trường", "C. Không hiển thị thông báo lỗi", "D. Sử dụng CAPTCHA phức tạp"], ans: [0] },
  { q: "Quy tắc 3-click trong UI/UX có nghĩa là gì?", opts: ["A. Người dùng nên hoàn thành tác vụ trong tối đa 3 lần nhấp chuột", "B. Website chỉ được phép có 3 liên kết chính", "C. Một chức năng chỉ có thể sử dụng 3 lần", "D. Menu chính chỉ nên có 3 mục"], ans: [0] },
  { q: "Flat design là gì?", opts: ["A. Phong cách thiết kế tối giản, không có hiệu ứng 3D", "B. Giao diện web chỉ có một màu duy nhất", "C. Thiết kế sử dụng nhiều hiệu ứng bóng đổ", "D. Thiết kế tập trung vào hình ảnh động"], ans: [0] },
  { q: "Tại sao responsive design quan trọng?", opts: ["A. Giúp trang web hoạt động tốt trên nhiều kích thước màn hình", "B. Giảm dung lượng hình ảnh", "C. Tăng tốc độ tải trang", "D. Hạn chế sử dụng JavaScript"], ans: [0] },
  { q: "Nguyên tắc Fitts' Law trong thiết kế UI đề cập đến gì?", opts: ["A. Kích thước và khoảng cách của các đối tượng ảnh hưởng đến tốc độ tương tác của người dùng", "B. Mắt người dùng quét nội dung theo hình chữ \"F\"", "C. Người dùng thích bấm vào các nút lớn hơn", "D. Một trang web cần tối thiểu 3 giây để tải"], ans: [0] },
  { q: "Heatmap trong UX có tác dụng gì?", opts: ["A. Theo dõi vùng người dùng tương tác nhiều nhất trên giao diện", "B. Đo lường thời gian tải trang", "C. Xác định màu sắc phổ biến của trang web", "D. Kiểm tra tốc độ cuộn trang"], ans: [0] },
  { q: "A/B Testing trong UI/UX là gì?", opts: ["A. So sánh hai phiên bản thiết kế để chọn phiên bản tốt hơn", "B. Đánh giá hai trang web cùng lúc", "C. Một phương pháp kiểm tra lỗi trên giao diện", "D. Một kiểu thiết kế đặc biệt"], ans: [0] },
  { q: "Các yếu tố nào giúp tối ưu SEO cho UI/UX?", opts: ["A. Cấu trúc URL rõ ràng", "B. Hiển thị nhiều pop-up", "C. Sử dụng quá nhiều hiệu ứng động", "D. Dùng văn bản màu sáng trên nền sáng"], ans: [0] },
  { q: "Bạn đang thiết kế một trang web thương mại điện tử. Điều nào sau đây giúp cải thiện UX khi người dùng tìm kiếm sản phẩm?", opts: ["A. Hiển thị gợi ý tìm kiếm khi người dùng nhập từ khóa", "B. Chỉ cho phép tìm kiếm theo danh mục sản phẩm", "C. Tự động sửa lỗi chính tả trong từ khóa tìm kiếm", "D. Ẩn thanh tìm kiếm để tránh làm rối giao diện"], ans: [0, 2] },
  { q: "Khi thiết kế form đăng ký tài khoản, điều nào giúp giảm tỷ lệ từ bỏ form?", opts: ["A. Hiển thị tiến trình đăng ký theo từng bước", "B. Bắt buộc nhập lại mật khẩu hai lần mà không có tùy chọn hiển thị mật khẩu", "C. Sử dụng nhãn (label) rõ ràng và đặt placeholder để hướng dẫn nhập liệu", "D. Yêu cầu người dùng nhập tất cả thông tin cá nhân ngay từ bước đầu tiên"], ans: [0, 2] },
  { q: "Bạn đang thiết kế một ứng dụng đặt xe. Điều nào giúp cải thiện trải nghiệm người dùng?", opts: ["A. Hiển thị vị trí tài xế theo thời gian thực trên bản đồ", "B. Chỉ hiển thị vị trí tài xế sau khi xác nhận đặt xe", "C. Cung cấp thông tin chi tiết về tài xế và biển số xe trước khi xe đến đón", "D. Không cần xác nhận giá cước trước khi đặt xe"], ans: [0, 2] },
  { q: "Trong một ứng dụng ngân hàng số, yếu tố nào giúp tăng cường trải nghiệm và bảo mật cho người dùng?", opts: ["A. Cho phép đăng nhập bằng sinh trắc học (vân tay, Face ID)", "B. Tự động đăng xuất sau một khoảng thời gian không hoạt động", "C. Bắt buộc nhập lại mật khẩu mỗi lần giao dịch, dù là số tiền nhỏ", "D. Không hiển thị thông báo lỗi cụ thể khi nhập sai mật khẩu"], ans: [0, 1] },
  { q: "Khi thiết kế giao diện mobile app, điều nào giúp tăng tỷ lệ chuyển đổi (conversion rate)?", opts: ["A. Nút CTA (Call to Action) lớn, dễ nhìn và nằm trong vùng có thể chạm bằng ngón tay", "B. Yêu cầu người dùng tạo tài khoản trước khi hiển thị bất kỳ nội dung nào", "C. Giảm số lượng bước khi thực hiện thanh toán", "D. Hiển thị quảng cáo toàn màn hình ngay khi người dùng mở ứng dụng"], ans: [0, 2] },
  { q: "Một website bán hàng muốn tăng trải nghiệm người dùng khi xem sản phẩm. Điều nào là cách tiếp cận đúng?", opts: ["A. Cung cấp ảnh sản phẩm độ phân giải cao, có thể phóng to chi tiết", "B. Hiển thị quá nhiều thông tin kỹ thuật trên trang sản phẩm", "C. Cung cấp đánh giá từ khách hàng khác ngay trên trang sản phẩm", "D. Tự động phát video quảng cáo sản phẩm mà không có nút tắt"], ans: [0, 2] },
  { q: "Khi thiết kế menu điều hướng trên website, điều nào giúp cải thiện trải nghiệm người dùng?", opts: ["A. Sử dụng menu cố định (sticky menu) trên trang web dài", "B. Ẩn menu và chỉ hiển thị khi người dùng di chuột vào góc màn hình", "C. Đặt tất cả các danh mục trong một menu duy nhất, không phân nhóm", "D. Sử dụng tối đa 7 mục chính trong menu để tránh gây quá tải thông tin"], ans: [0] },
  { q: "Một ứng dụng giao hàng cần cải thiện UX. Điều nào sau đây là giải pháp hợp lý?", opts: ["A. Hiển thị dự kiến thời gian giao hàng dựa trên vị trí thực tế", "B. Chỉ thông báo trạng thái đơn hàng khi người dùng tự kiểm tra", "C. Cung cấp tùy chọn thay đổi địa chỉ giao hàng ngay trước khi giao", "D. Chỉ gửi thông báo qua email, không có thông báo trong ứng dụng"], ans: [0, 2] },
  { q: "Bạn đang thiết kế trang web tin tức. Điều nào giúp giữ chân người đọc lâu hơn?", opts: ["A. Hiển thị nội dung liên quan sau mỗi bài viết", "B. Không cho phép đọc bài viết nếu chưa đăng nhập", "C. Tự động tải bài viết tiếp theo khi cuộn đến cuối trang", "D. Sử dụng quá nhiều quảng cáo giữa nội dung bài viết"], ans: [0, 2] },
  { q: "Một website cần cải thiện tốc độ tải trang để nâng cao trải nghiệm. Điều nào là cách tiếp cận đúng?", opts: ["A. Tối ưu hình ảnh bằng cách sử dụng định dạng WebP", "B. Giảm số lượng yêu cầu HTTP bằng cách gộp file CSS và JavaScript", "C. Tăng kích thước ảnh để đảm bảo chất lượng hiển thị tốt hơn", "D. Tắt cache trình duyệt để luôn tải dữ liệu mới"], ans: [0, 1] },
  { q: "Phương pháp nào thường được sử dụng để đánh giá khả năng sử dụng (usability) của giao diện?", opts: ["A. Kiểm thử người dùng (User Testing)", "B. Phân tích heuristic (Heuristic Evaluation)", "C. A/B Testing", "D. So sánh với các trang web đối thủ mà không cần thử nghiệm"], ans: [0, 1] },
  { q: "Khi thực hiện A/B Testing trên UI, điều nào là đúng?", opts: ["A. Chỉ nên thay đổi một yếu tố tại một thời điểm", "B. Có thể thử nghiệm nhiều yếu tố cùng lúc mà không ảnh hưởng đến kết quả", "C. A/B Testing chỉ áp dụng cho giao diện web, không áp dụng cho mobile app", "D. Cần có một lượng dữ liệu đủ lớn để đảm bảo kết quả có ý nghĩa thống kê"], ans: [0, 3] },
  { q: "Khi thực hiện phỏng vấn người dùng để đánh giá UX, điều nào là quan trọng nhất?", opts: ["A. Đặt câu hỏi mở để người dùng chia sẻ trải nghiệm thực tế", "B. Hướng dẫn người dùng trả lời theo cách mình mong muốn", "C. Ghi nhận cả phản hồi tích cực và tiêu cực", "D. Chỉ tập trung vào các phản hồi tiêu cực để cải thiện sản phẩm"], ans: [0, 2] },
  { q: "Design System là gì?", opts: ["A. Một bộ tài liệu hướng dẫn về UI/UX giúp tạo sự nhất quán trong thiết kế", "B. Một tập hợp các mẫu giao diện UI đã được lập trình sẵn", "C. Một hệ thống giúp các nhà thiết kế và lập trình viên làm việc hiệu quả hơn", "D. Một bộ quy tắc chỉ áp dụng cho thiết kế ứng dụng di động"], ans: [0, 2] },
  { q: "Thành phần chính của một Design System là gì?", opts: ["A. Thư viện UI Components", "B. Hướng dẫn về màu sắc, typography, khoảng cách", "C. Tài liệu hướng dẫn cách phát triển hệ thống backend", "D. Nguyên tắc thiết kế và quy trình làm việc"], ans: [0, 1, 3] },
  { q: "Lợi ích chính của Design System trong thiết kế UI/UX là gì?", opts: ["A. Tăng tốc độ thiết kế và phát triển sản phẩm", "B. Giúp giao diện có tính nhất quán trên nhiều nền tảng", "C. Giảm số lượng lỗi thiết kế không đồng nhất", "D. Hạn chế sự sáng tạo của nhà thiết kế"], ans: [0, 1, 2] },
  { q: "Atomic Design là gì?", opts: ["A. Một phương pháp tổ chức UI Components theo các cấp độ từ nhỏ đến lớn", "B. Một loại framework frontend", "C. Chỉ áp dụng cho thiết kế web tĩnh", "D. Bao gồm các thành phần: Atoms, Molecules, Organisms, Templates, Pages"], ans: [0, 3] },
  { q: "Trong Design System, thành phần nào giúp đảm bảo tính nhất quán về nội dung?", opts: ["A. Content Guidelines", "B. Design Tokens", "C. UI Components", "D. Brand Identity"], ans: [0] },
  { q: "Design Tokens được sử dụng để làm gì trong Design System?", opts: ["A. Lưu trữ các giá trị thiết kế như màu sắc, khoảng cách, typography", "B. Tạo các mẫu giao diện động", "C. Là một công cụ lập trình backend", "D. Giúp tùy chỉnh giao diện linh hoạt hơn trên các nền tảng khác nhau"], ans: [0, 3] },
  { q: "Khi nào nên xây dựng hoặc áp dụng Design System?", opts: ["A. Khi muốn tạo giao diện nhất quán trên nhiều sản phẩm", "B. Khi đội ngũ thiết kế và phát triển phải làm việc cùng nhau", "C. Chỉ khi sản phẩm đã hoàn thiện", "D. Khi cần tăng tốc độ phát triển UI"], ans: [0, 1, 3] },
  { q: "Trong một Design System, nguyên tắc nào giúp tạo trải nghiệm người dùng tốt hơn?", opts: ["A. Tính nhất quán trong thiết kế và trải nghiệm", "B. Linh hoạt để dễ dàng tùy chỉnh khi cần thiết", "C. Không cần tuân thủ bất kỳ quy tắc nào để tăng tính sáng tạo", "D. Đảm bảo khả năng truy cập (Accessibility) cho mọi người dùng"], ans: [0, 1, 3] },
  { q: "Một số Design System phổ biến hiện nay là gì?", opts: ["A. Google Material Design", "B. Apple Human Interface Guidelines", "C. Bootstrap Grid System", "D. Atlassian Design System"], ans: [0, 1, 3] },
  { q: "Điều nào sau đây không phải là một nhược điểm của Design System?", opts: ["A. Cần đầu tư thời gian và nguồn lực ban đầu để xây dựng", "B. Có thể giới hạn sự sáng tạo của nhà thiết kế", "C. Tăng khả năng mở rộng và bảo trì giao diện sản phẩm", "D. Khó khăn trong việc áp dụng đồng bộ khi có quá nhiều thành viên trong nhóm"], ans: [2] }
].map((item, idx) => ({ ...item, id: idx + 1 }));

const txtLatestRawData = [
  { q: "UX Research là gì?", opts: ["A. Nghiên cứu hành vi và nhu cầu của người dùng để cải thiện sản phẩm.", "B. Một phương pháp lập trình phần mềm.", "C. Quá trình thiết kế giao diện người dùng (UI).", "D. Một phần của tiếp thị sản phẩm."], ans: [0] },
  { q: "Phương pháp UX Research nào dưới đây là nghiên cứu định tính?", opts: ["A. Phỏng vấn người dùng", "B. Khảo sát trực tuyến", "C. A/B Testing", "D. Eye-tracking"], ans: [0] },
  { q: "Nghiên cứu UX chủ yếu giúp cải thiện điều gì?", opts: ["A. Tăng lượng người dùng", "B. Cải thiện trải nghiệm người dùng", "C. Giảm chi phí phát triển phần mềm", "D. Tăng thứ hạng SEO"], ans: [1] },
  { q: "Phương pháp nào dưới đây KHÔNG thuộc UX Research?", opts: ["A. Phỏng vấn sâu", "B. Khảo sát người dùng", "C. Phân tích doanh thu bán hàng", "D. Kiểm tra khả năng sử dụng (Usability Testing)"], ans: [2] },
  { q: "Thời điểm lý tưởng để tiến hành UX Research là khi nào?", opts: ["A. Trước khi thiết kế sản phẩm", "B. Trong quá trình phát triển sản phẩm", "C. Sau khi sản phẩm ra mắt", "D. Tất cả các giai đoạn trên"], ans: [3] },
  { q: "Persona trong UX Research là gì?", opts: ["A. Hồ sơ khách hàng lý tưởng dựa trên dữ liệu thực tế", "B. Một tập hợp các nguyên tắc thiết kế", "C. Kỹ thuật lập trình giao diện", "D. Một phần mềm phân tích dữ liệu người dùng"], ans: [0] },
  { q: "Đâu là một ví dụ về nghiên cứu định lượng trong UX Research?", opts: ["A. Phỏng vấn người dùng", "B. Thử nghiệm A/B", "C. Quan sát hành vi người dùng", "D. Nhật ký trải nghiệm"], ans: [1] },
  { q: "\"Heuristic Evaluation\" trong UX Research là gì?", opts: ["A. Đánh giá sản phẩm dựa trên kinh nghiệm của chuyên gia", "B. Một kỹ thuật phỏng vấn nhóm", "C. Một phương pháp phân tích dữ liệu", "D. Một loại khảo sát người dùng"], ans: [0] },
  { q: "Khi thực hiện kiểm tra khả năng sử dụng (Usability Testing), đâu là điều quan trọng nhất?", opts: ["A. Số lượng người tham gia lớn", "B. Người tham gia phản hồi trung thực và hành vi tự nhiên", "C. Chạy thử nghiệm trong môi trường giả lập", "D. Đảm bảo sản phẩm đã hoàn chỉnh trước khi kiểm tra"], ans: [1] },
  { q: "Card Sorting được sử dụng để làm gì trong UX Research?", opts: ["A. Kiểm tra tốc độ tải trang", "B. Xác định cách người dùng tổ chức thông tin", "C. Đánh giá mức độ thân thiện của giao diện", "D. Phân tích xu hướng tìm kiếm"], ans: [1] },
  { q: "Đâu là một trong những lỗi phổ biến khi thực hiện UX Research?", opts: ["A. Thu thập dữ liệu từ một nhóm người dùng không đại diện", "B. Sử dụng quá nhiều phương pháp khác nhau", "C. Không sử dụng bất kỳ công cụ nào", "D. Chỉ sử dụng dữ liệu định lượng"], ans: [0] },
  { q: "Phương pháp \"Think-Aloud Protocol\" giúp thu thập thông tin bằng cách nào?", opts: ["A. Yêu cầu người dùng nói to suy nghĩ của họ khi thực hiện nhiệm vụ", "B. Quan sát người dùng mà không can thiệp", "C. Đo lường thời gian hoàn thành nhiệm vụ", "D. Phân tích số lần người dùng thoát khỏi trang"], ans: [0] },
  { q: "Trong UX Research, chỉ số \"Net Promoter Score (NPS)\" đo lường điều gì?", opts: ["A. Mức độ hài lòng của người dùng", "B. Khả năng người dùng giới thiệu sản phẩm cho người khác", "C. Thời gian trung bình trên trang", "D. Số lần người dùng quay lại sản phẩm"], ans: [1] },
  { q: "Khi nào nên sử dụng phương pháp ethnographic research trong UX?", opts: ["A. Khi muốn hiểu người dùng trong môi trường tự nhiên của họ", "B. Khi cần thu thập dữ liệu số lượng lớn", "C. Khi thử nghiệm sản phẩm trên thị trường", "D. Khi đánh giá mức độ dễ sử dụng của giao diện"], ans: [0] },
  { q: "Phân tích “Eye-tracking” giúp khám phá điều gì về người dùng?", opts: ["A. Thời gian người dùng hoàn thành một nhiệm vụ", "B. Cách người dùng phản hồi với nội dung", "C. Sự hài lòng của người dùng với thiết kế", "D. Vị trí người dùng tập trung ánh nhìn trên giao diện"], ans: [3] },
  { q: "Tree Testing hữu ích nhất trong tình huống nào?", opts: ["A. Đánh giá cấu trúc thông tin của một trang web", "B. Kiểm tra phản hồi cảm xúc của người dùng", "C. Đo lường mức độ hiệu quả của giao diện", "D. Xác định khu vực quan tâm trên giao diện"], ans: [0] },
  { q: "Khi thực hiện nghiên cứu UX cho một sản phẩm mới, đâu là cách tiếp cận tốt nhất?", opts: ["A. Chỉ thực hiện khảo sát trực tuyến", "B. Kết hợp nghiên cứu định tính và định lượng", "C. Chỉ quan sát người dùng thực tế", "D. Chỉ phỏng vấn chuyên gia UX"], ans: [1] },
  { q: "Phương pháp nào giúp phát hiện \"pain points\" của người dùng?", opts: ["A. Usability Testing", "B. Eye-tracking", "C. Phân tích dữ liệu từ Google Analytics", "D. Net Promoter Score (NPS)"], ans: [0] },
  { q: "Đâu là một yếu tố quan trọng khi thiết kế một nghiên cứu UX thành công?", opts: ["A. Chọn mẫu ngẫu nhiên từ bất kỳ nhóm người nào", "B. Giới hạn nghiên cứu trong một phương pháp duy nhất", "C. Xác định rõ mục tiêu nghiên cứu", "D. Chỉ thu thập dữ liệu định lượng"], ans: [2] },
  { q: "Persona trong UX Research là gì?", opts: ["A. Một loại bản đồ hành trình khách hàng", "B. Một hồ sơ người dùng giả định nhưng dựa trên dữ liệu thực tế", "C. Một phương pháp phân tích hành vi", "D. Một công cụ đo lường hiệu suất website"], ans: [1] },
  { q: "Mục đích chính của việc tạo personas là gì?", opts: ["A. Dự đoán doanh thu sản phẩm", "B. Xây dựng nhóm khách hàng giả lập để hiểu rõ nhu cầu và hành vi của họ", "C. Kiểm thử giao diện sản phẩm", "D. Xây dựng mô hình kinh doanh"], ans: [1] },
  { q: "Yếu tố nào KHÔNG thường xuất hiện trong một persona?", opts: ["A. Tên giả định", "B. Thu nhập hàng tháng", "C. Số lượng bạn bè trên mạng xã hội", "D. Mục tiêu và nỗi đau (pain points)"], ans: [2] },
  { q: "Empathy Map giúp ích gì trong UX Research?", opts: ["A. Phân tích tỷ lệ chuyển đổi người dùng", "B. Hiểu sâu hơn về cảm xúc, suy nghĩ, hành động và nhu cầu của người dùng", "C. Đánh giá tốc độ tải trang web", "D. Xây dựng mô hình doanh thu"], ans: [1] },
  { q: "Bốn thành phần chính của một empathy map là gì?", opts: ["A. Suy nghĩ, cảm xúc, hành vi, dữ liệu nhân khẩu học", "B. Nghe, nói, làm, cảm nhận", "C. Phân khúc khách hàng, mục tiêu kinh doanh, KPI, insight", "D. Nhân khẩu học, sở thích, thu nhập, thói quen chi tiêu"], ans: [1] },
  { q: "Customer Journey Map là gì?", opts: ["A. Một biểu đồ thể hiện sự thay đổi về giá của sản phẩm", "B. Một bản đồ thể hiện quá trình tương tác của người dùng với sản phẩm/dịch vụ", "C. Một danh sách tính năng cần có trong sản phẩm", "D. Một công cụ để đo lường hiệu suất tiếp thị"], ans: [1] },
  { q: "Giai đoạn nào KHÔNG nằm trong Customer Journey Map?", opts: ["A. Nhận thức (Awareness)", "B. Đánh giá (Consideration)", "C. Mua hàng (Purchase)", "D. Kiểm thử (Testing)"], ans: [3] },
  { q: "Persona có thể thay đổi theo thời gian không?", opts: ["A. Có, vì hành vi và nhu cầu của người dùng có thể thay đổi", "B. Không, vì personas dựa trên dữ liệu cố định", "C. Chỉ thay đổi nếu sản phẩm thay đổi hoàn toàn", "D. Chỉ thay đổi khi công ty thay đổi chiến lược tiếp thị"], ans: [0] },
  { q: "Khi tạo personas, dữ liệu nào thường được thu thập?", opts: ["A. Độ tuổi, nghề nghiệp, sở thích, mục tiêu, khó khăn", "B. Mật khẩu tài khoản, lịch sử tìm kiếm, thông tin ngân hàng", "C. Số điện thoại, địa chỉ nhà, thu nhập cá nhân", "D. Màu sắc yêu thích, món ăn ưa thích, phong cách ăn mặc"], ans: [0] },
  { q: "Empathy Map giúp nhóm thiết kế tránh điều gì?", opts: ["A. Phán đoán chủ quan về người dùng", "B. Việc tạo ra nhiều personas", "C. Sử dụng dữ liệu định lượng", "D. Phải thực hiện A/B Testing"], ans: [0] },
  { q: "Customer Journey Map có thể giúp cải thiện điều gì?", opts: ["A. Chiến lược kinh doanh tổng thể", "B. Trải nghiệm người dùng bằng cách xác định điểm đau (pain points)", "C. Lợi nhuận công ty", "D. Chiến lược quảng cáo trên mạng xã hội"], ans: [1] },
  { q: "Điều gì quan trọng nhất khi xây dựng một Customer Journey Map?", opts: ["A. Xác định tất cả điểm tiếp xúc (touchpoints) của người dùng", "B. Tạo ra nhiều personas khác nhau", "C. Lựa chọn công nghệ mới nhất", "D. Xác định đối thủ cạnh tranh chính"], ans: [0] },
  { q: "Empathy Map nên được cập nhật khi nào?", opts: ["A. Khi có dữ liệu người dùng mới", "B. Chỉ khi sản phẩm thay đổi", "C. Mỗi 5 năm một lần", "D. Không bao giờ cần cập nhật"], ans: [0] },
  { q: "Điểm tiếp xúc (touchpoint) trong Customer Journey Map là gì?", opts: ["A. Những khoảnh khắc người dùng tương tác với sản phẩm/dịch vụ", "B. Các giai đoạn mua hàng", "C. Số lần người dùng truy cập website", "D. Một loại biểu đồ UX"], ans: [0] },
  { q: "Phương pháp nào giúp thu thập dữ liệu để tạo personas?", opts: ["A. Phỏng vấn người dùng", "B. Phân tích dữ liệu Google Analytics", "C. Khảo sát trực tuyến", "D. Tất cả các phương án trên"], ans: [3] },
  { q: "Customer Journey Map có thể giúp phát hiện vấn đề gì trong trải nghiệm người dùng?", opts: ["A. Nơi người dùng cảm thấy khó chịu hoặc bỏ cuộc", "B. Xu hướng thiết kế UI mới nhất", "C. Cách tối ưu hóa SEO", "D. Những yếu tố kỹ thuật không liên quan đến người dùng"], ans: [0] },
  { q: "Điều gì làm cho một persona trở nên hiệu quả?", opts: ["A. Dựa trên dữ liệu thực tế thay vì giả định", "B. Được tạo ra bởi nhóm marketing", "C. Không bao giờ thay đổi", "D. Chỉ cần bao gồm thông tin nhân khẩu học"], ans: [0] },
  { q: "Empathy Map giúp ích gì trong thiết kế sản phẩm?", opts: ["A. Xác định lỗi kỹ thuật trong phần mềm", "B. Tạo ra sản phẩm phù hợp hơn với cảm xúc và nhu cầu của người dùng", "C. Dự đoán xu hướng công nghệ", "D. Phân tích số lượt tải ứng dụng"], ans: [1] },
  { q: "Customer Journey Map có thể kết hợp với phương pháp nào để tối ưu trải nghiệm người dùng?", opts: ["A. A/B Testing", "B. Eye-tracking", "C. Usability Testing", "D. Tất cả các phương án trên"], ans: [3] },
  { q: "Điều quan trọng nhất khi sử dụng personas trong quá trình phát triển sản phẩm là gì?", opts: ["A. Hiểu rõ mục tiêu và nhu cầu của người dùng", "B. Chỉ tập trung vào một persona duy nhất", "C. Không cần cập nhật personas", "D. Dựa vào trực giác thay vì dữ liệu"], ans: [0] },
  { q: "Chỉ số nào sau đây quan trọng nhất để đánh giá hiệu suất UX của một trang thương mại điện tử?", opts: ["A. Bounce Rate", "B. Conversion Rate", "C. Page Views", "D. Domain Authority"], ans: [1] },
  { q: "Đâu là một lỗi UX phổ biến khiến người dùng từ bỏ giỏ hàng (Cart Abandonment) trên trang thương mại điện tử?", opts: ["A. Thiếu mô tả sản phẩm chi tiết", "B. Quá nhiều bước trong quá trình thanh toán", "C. Hình ảnh sản phẩm chất lượng cao", "D. Hiển thị đánh giá từ người mua trước đó"], ans: [1] },
  { q: "Khi sử dụng Eye Tracking để phân tích UX trên trang thương mại điện tử, yếu tố nào quan trọng nhất?", opts: ["A. Vị trí khách hàng thường nhìn vào đầu tiên", "B. Số lần người dùng truy cập vào trang web", "C. Số lượng click vào nút \"Mua ngay\"", "D. Thời gian tải trang"], ans: [0] },
  { q: "Trong thiết kế UX cho chatbot AI, yếu tố nào quan trọng nhất?", opts: ["A. Giao diện đồ họa đẹp mắt", "B. Phản hồi nhanh và chính xác", "C. Sử dụng nhiều thuật ngữ kỹ thuật", "D. Không có khả năng học hỏi từ người dùng"], ans: [1] },
  { q: "Một trợ lý ảo AI cần tối ưu UX bằng cách nào?", opts: ["A. Cá nhân hóa câu trả lời dựa trên hành vi người dùng", "B. Cung cấp câu trả lời ngẫu nhiên để tạo sự bất ngờ", "C. Giới hạn thời gian phản hồi quá nhanh để tạo cảm giác \"tự nhiên\"", "D. Chỉ hỗ trợ văn bản, không cần hỗ trợ giọng nói"], ans: [0] },
  { q: "UX của hệ thống gợi ý sản phẩm dựa trên AI (Recommendation System) cần đáp ứng điều gì?", opts: ["A. Hiển thị các sản phẩm phù hợp với sở thích của từng người dùng", "B. Đề xuất sản phẩm ngẫu nhiên để tăng tính đa dạng", "C. Chỉ dựa vào dữ liệu mua sắm trước đây mà không cần điều chỉnh theo thời gian", "D. Chỉ hiển thị các sản phẩm phổ biến nhất mà không cá nhân hóa"], ans: [0] },
  { q: "Để đánh giá UX của thiết bị IoT, phương pháp nào phù hợp nhất?", opts: ["A. Usability Testing trong môi trường thực tế", "B. Phân tích dữ liệu cảm biến từ thiết bị", "C. Phỏng vấn người dùng sau khi sử dụng thiết bị", "D. Tất cả các phương án trên"], ans: [3] },
  { q: "Trong thiết kế UX cho thiết bị nhà thông minh (Smart Home), điều gì quan trọng nhất?", opts: ["A. Thiết bị phải tự động hoạt động mà không cần tương tác của người dùng", "B. Hỗ trợ điều khiển từ xa và cá nhân hóa trải nghiệm", "C. Chỉ cần một giao diện điều khiển trên máy tính mà không cần ứng dụng di động", "D. Không cần hướng dẫn sử dụng vì người dùng sẽ tự tìm hiểu"], ans: [1] },
  { q: "Một trang sản phẩm có tỷ lệ chuyển đổi thấp. Đâu là cách tốt nhất để cải thiện?", opts: ["A. Thêm nhiều hình ảnh và video chất lượng cao", "B. Giảm số lượng thông tin hiển thị để tránh quá tải thông tin", "C. Thêm tính năng chat AI hỗ trợ tư vấn sản phẩm", "D. A và C (Thêm hình ảnh, video chất lượng và AI chat)"], ans: [3] },
  { q: "Bạn thiết kế UX cho trang thanh toán nhưng khách hàng thường bỏ dở quá trình thanh toán. Nguyên nhân nào có thể xảy ra?", opts: ["A. Quá nhiều trường thông tin cần nhập", "B. Không có tùy chọn thanh toán nhanh", "C. Không hiển thị rõ ràng phí vận chuyển", "D. Tất cả các phương án trên"], ans: [3] },
  { q: "Khi đánh giá UX của một hệ thống nhận diện giọng nói AI, chỉ số nào quan trọng nhất?", opts: ["A. Độ chính xác của nhận diện", "B. Thời gian phản hồi", "C. Mức độ tự nhiên của giọng đọc phản hồi", "D. Tất cả các phương án trên"], ans: [3] },
  { q: "Một ứng dụng IoT có thời gian phản hồi chậm khi điều khiển thiết bị. Điều gì ảnh hưởng lớn nhất đến UX?", opts: ["A. Độ trễ mạng", "B. Giao diện ứng dụng", "C. Thiết kế phần cứng", "D. Logo thương hiệu"], ans: [0] },
  { q: "Mô hình tổ chức thông tin nào phổ biến trong thiết kế UX?", opts: ["A. Dạng phân cấp (Hierarchical)", "B. Dạng tuần tự (Sequential)", "C. Dạng ma trận (Matrix)", "D. Tất cả các phương án trên"], ans: [3] },
  { q: "Thuật ngữ \"Card Sorting\" trong UX Design đề cập đến:", opts: ["A. Phương pháp kiểm thử giao diện", "B. Kỹ thuật tổ chức và phân loại nội dung", "C. Công cụ tạo wireframe", "D. Phương pháp đánh giá hiệu suất ứng dụng"], ans: [1] },
  { q: "Trong kiến trúc thông tin, thuật ngữ “Findability” có nghĩa là gì?", opts: ["A. Khả năng người dùng tìm thấy thông tin họ cần", "B. Khả năng tìm kiếm nội dung trên Google", "C. Tốc độ tải trang của ứng dụng", "D. Khả năng điều hướng tự động của hệ thống"], ans: [0] },
  { q: "Một hệ thống phân cấp thông tin tốt sẽ giúp:", opts: ["A. Giảm thời gian tải trang", "B. Tăng khả năng tìm kiếm và điều hướng dễ dàng", "C. Làm cho giao diện đẹp hơn", "D. Giảm số lượng người dùng cần hỗ trợ kỹ thuật"], ans: [1] },
  { q: "Sơ đồ nào thường được dùng để mô tả kiến trúc thông tin?", opts: ["A. Flowchart", "B. Sitemap", "C. Wireframe", "D. Grid system"], ans: [1] },
  { q: "Thuật ngữ “Global Navigation” trong UX nghĩa là gì?", opts: ["A. Hệ thống điều hướng có thể truy cập từ bất kỳ trang nào trên website", "B. Điều hướng dựa trên vị trí địa lý", "C. Điều hướng dựa trên lịch sử tìm kiếm", "D. Một loại chatbot hỗ trợ người dùng"], ans: [0] },
  { q: "Trong một hệ thống phân cấp thông tin, loại trang nào thường nằm ở cấp thấp nhất?", opts: ["A. Trang chủ", "B. Trang danh mục (Category)", "C. Trang sản phẩm hoặc chi tiết nội dung", "D. Trang liên hệ"], ans: [2] },
  { q: "“Breadcrumb Navigation” giúp ích gì trong UX?", opts: ["A. Hiển thị lịch sử duyệt web của người dùng", "B. Giúp người dùng biết vị trí hiện tại trong cấu trúc trang web", "C. Cung cấp tính năng tìm kiếm thông minh", "D. Tăng tốc độ tải trang"], ans: [1] },
  { q: "Trong UX, nguyên tắc \"Progressive Disclosure\" (Tiết lộ dần) giúp:", opts: ["A. Giảm tải thông tin ban đầu và chỉ hiển thị thông tin khi cần thiết", "B. Hiển thị toàn bộ thông tin ngay lập tức", "C. Giảm số lượng menu trong điều hướng", "D. Tăng tốc độ tải dữ liệu"], ans: [0] },
  { q: "Wireframe là", opts: ["A. Một bản phác thảo giao diện người dùng", "B. Một loại mã nguồn", "C. Một phần mềm thiết kế đồ họa", "D. Một hệ thống điều hướng"], ans: [0] },
  { q: "Wireframe thường được chia thành mấy cấp độ chi tiết?", opts: ["A. 1", "B. 2", "C. 3", "D. 4"], ans: [2] },
  { q: "Loại wireframe nào chỉ thể hiện cấu trúc cơ bản mà không có nội dung hoặc hình ảnh chi tiết?", opts: ["A. Wireframe tĩnh (Static wireframe)", "B. Low-fidelity wireframe", "C. High-fidelity wireframe", "D. Mockup"], ans: [1] },
  { q: "Khi thiết kế wireframe, yếu tố nào KHÔNG cần được xác định ngay từ đầu?", opts: ["A. Hệ thống màu sắc", "B. Luồng điều hướng", "C. Các vùng chức năng chính của trang", "D. Bố cục nội dung"], ans: [0] },
  { q: "Một wireframe hiệu quả nên có đặc điểm gì?", opts: ["A. Chi tiết giống như bản thiết kế cuối cùng", "B. Tập trung vào bố cục và luồng trải nghiệm", "C. Có đầy đủ hình ảnh và màu sắc", "D. Chỉ cần có hình ảnh sản phẩm"], ans: [1] },
  { q: "Wireframe không nên bao gồm yếu tố nào?", opts: ["A. Bố cục nội dung", "B. Hệ thống định vị (Navigation)", "C. Màu sắc thương hiệu", "D. Chú thích về chức năng"], ans: [2] },
  { q: "Wireframe giúp ích gì trong quá trình thiết kế UX?", opts: ["A. Định hình bố cục và chức năng trước khi thiết kế chi tiết", "B. Thay thế hoàn toàn bản thiết kế UI", "C. Giúp viết mã nguồn nhanh hơn", "D. Tạo ra các quảng cáo trên ứng dụng"], ans: [0] },
  { q: "Tại sao wireframe low-fidelity lại quan trọng?", opts: ["A. Giúp nhanh chóng thử nghiệm ý tưởng và chỉnh sửa dễ dàng", "B. Có thể sử dụng ngay làm giao diện sản phẩm", "C. Không cần vì luôn phải dùng high-fidelity wireframe", "D. Chỉ phù hợp với thiết kế app, không áp dụng cho website"], ans: [0] },
  { q: "Trong quy trình UX, wireframe được tạo ở giai đoạn nào?", opts: ["A. Sau khi hoàn tất thiết kế đồ họa", "B. Trước khi nghiên cứu người dùng", "C. Trước khi bắt đầu thiết kế UI", "D. Sau khi phát triển ứng dụng"], ans: [2] },
  { q: "Một ứng dụng đặt xe nhận thấy rằng nhiều người dùng thoát ra ngay sau khi nhập điểm đến. Cách tối ưu luồng người dùng tốt nhất là gì?", opts: ["A. Hiển thị ngay giá ước tính và thời gian chờ xe trước khi yêu cầu xác nhận", "B. Buộc người dùng nhập thông tin thanh toán trước khi xem giá", "C. Ẩn thông tin tài xế và thời gian chờ cho đến khi đặt xe thành công", "D. Giảm số lượng phương thức thanh toán có sẵn"], ans: [0] },
  { q: "Khi thiết kế luồng đăng ký tài khoản trên ứng dụng học trực tuyến, yếu tố nào giúp tăng tỷ lệ hoàn thành đăng ký?", opts: ["A. Yêu cầu người dùng điền tất cả thông tin trong một trang duy nhất", "B. Không cung cấp tùy chọn đăng ký bằng tài khoản Google/Facebook", "C. Chia quá trình đăng ký thành từng bước nhỏ, bắt đầu với thông tin cơ bản trước", "D. Bắt buộc xác minh email trước khi cho phép điền thông tin cá nhân"], ans: [2] },
  { q: "Khi thiết kế một hệ thống đặt vé máy bay, cách tốt nhất để tổ chức thông tin giúp người dùng đặt vé dễ dàng là:", opts: ["A. Hiển thị quy trình đặt vé theo các bước tuần tự", "B. Yêu cầu người dùng nhập tất cả thông tin trước khi hiển thị chuyến bay", "C. Đưa toàn bộ thông tin vào một trang duy nhất mà không chia nhỏ thành các bước", "D. Chỉ hiển thị chuyến bay phổ biến và yêu cầu người dùng tìm kiếm thủ công"], ans: [0] },
  { q: "Khi tổ chức cấu trúc thông tin cho một ứng dụng học trực tuyến, phương pháp nào hiệu quả nhất để giúp người dùng tìm khóa học phù hợp?", opts: ["A. Hiển thị danh sách toàn bộ khóa học mà không có phân loại", "B. Tạo menu điều hướng theo chủ đề và cấp độ học tập", "C. Sắp xếp khóa học theo thứ tự bảng chữ cái", "D. Chỉ hiển thị các khóa học phổ biến"], ans: [1] },
  { q: "Một ứng dụng di động cho phép người dùng đặt đồ ăn, nhưng nhiều người từ bỏ quy trình giữa chừng. Đâu là nguyên nhân có thể xảy ra?", opts: ["A. Quy trình đặt hàng quá phức tạp hoặc có quá nhiều bước", "B. Hệ thống không có đủ hình ảnh minh họa", "C. Ứng dụng không có nhiều tùy chọn thanh toán", "D. Thiết kế giao diện không có màu sắc bắt mắt"], ans: [0] },
  { q: "Khi thiết kế ứng dụng ngân hàng số, đâu là cách tốt nhất để đảm bảo luồng người dùng an toàn nhưng vẫn thuận tiện?", opts: ["A. Áp dụng xác thực hai yếu tố (2FA) nhưng chỉ yêu cầu khi thực hiện giao dịch quan trọng", "B. Yêu cầu đăng nhập lại mỗi lần mở ứng dụng", "C. Buộc người dùng đổi mật khẩu hàng tuần", "D. Hạn chế số lần đăng nhập mỗi ngày"], ans: [0] },
  { q: "Điểm khác biệt chính giữa wireframe và prototype là gì?", opts: ["A. Wireframe là bản nháp, còn prototype là bản hoàn chỉnh", "B. Wireframe tập trung vào bố cục và chức năng, còn prototype mô phỏng tương tác người dùng", "C. Wireframe dùng cho thiết kế ứng dụng, còn prototype dùng cho website", "D. Wireframe luôn được làm bằng tay, còn prototype phải thiết kế bằng phần mềm"], ans: [1] },
  { q: "Trong wireframing, nguyên tắc “Mobile-first” có nghĩa là gì?", opts: ["A. Thiết kế giao diện di động trước, sau đó mở rộng cho các nền tảng khác", "B. Luôn ưu tiên các ứng dụng di động hơn web", "C. Tối ưu hóa tốc độ tải trang trên thiết bị di động", "D. Chỉ sử dụng wireframe cho thiết bị di động"], ans: [0] },
  { q: "Khi đánh giá wireframe, phương pháp \"Heuristic Evaluation\" giúp kiểm tra điều gì?", opts: ["A. Khả năng điều hướng và tổ chức thông tin", "B. Hiệu suất hệ thống", "C. Sự khác biệt giữa phiên bản wireframe và giao diện hoàn chỉnh", "D. Độ chính xác của mã nguồn"], ans: [0] },
  { q: "Trong kiến trúc thông tin, phương pháp \"Tree Testing\" giúp đánh giá điều gì?", opts: ["A. Tốc độ tải trang web", "B. Hiệu quả của hệ thống phân cấp nội dung và điều hướng", "C. Độ chính xác của công cụ tìm kiếm", "D. Sự hài lòng của người dùng về giao diện đồ họa"], ans: [1] },
  { q: "Heatmap trong UX research giúp đánh giá điều gì?", opts: ["A. Khu vực mà người dùng nhấp chuột hoặc tập trung nhiều nhất trên giao diện", "B. Tốc độ phản hồi của trang web", "C. Mức độ hài lòng của người dùng với giao diện", "D. Hiệu suất tải trang web trên các thiết bị khác nhau"], ans: [0] },
  { q: "Khi thực hiện khảo sát về trải nghiệm người dùng, những điều nào là quan trọng?", opts: ["A. Câu hỏi phải ngắn gọn, rõ ràng, dễ hiểu", "B. Chỉ nên hỏi về các tính năng mới, không cần quan tâm đến tính năng cũ", "C. Cung cấp thang đo đánh giá (ví dụ: Likert scale) để dễ phân tích dữ liệu", "D. Chỉ hỏi ý kiến những người dùng có trải nghiệm tích cực"], ans: [0, 2] },
  { q: "UX Research là gì và mục tiêu chính của nó?", opts: ["A. Quá trình thu thập thông tin về hành vi, nhu cầu và động cơ của người dùng", "B. Một phương pháp thiết kế giao diện trực quan", "C. Đánh giá hiệu suất của hệ thống mà không cần phản hồi từ người dùng", "D. Nhằm tối ưu trải nghiệm của người dùng trên sản phẩm hoặc dịch vụ"], ans: [0, 3] },
  { q: "Phương pháp nghiên cứu nào thuộc nhóm nghiên cứu định tính (Qualitative Research)?", opts: ["A. Phỏng vấn người dùng (User Interviews)", "B. Khảo sát trực tuyến với câu hỏi có thang điểm", "C. Kiểm thử khả năng sử dụng (Usability Testing) có quan sát trực tiếp", "D. Phân tích dữ liệu hành vi từ Google Analytics"], ans: [0, 2] },
  { q: "Phương pháp nghiên cứu định lượng (Quantitative Research) có đặc điểm gì?", opts: ["A. Thu thập dữ liệu số liệu có thể đo lường", "B. Đưa ra kết luận dựa trên quan sát cá nhân", "C. Sử dụng khảo sát, phân tích dữ liệu lớn để đánh giá xu hướng", "D. Không thể áp dụng cho UX Research"], ans: [0, 2] },
  { q: "Khi nào nên sử dụng phương pháp Usability Testing?", opts: ["A. Khi muốn kiểm tra xem người dùng có thể hoàn thành nhiệm vụ trong giao diện hay không", "B. Khi cần thu thập dữ liệu về lượng truy cập trang web", "C. Khi muốn hiểu rõ hơn về cảm xúc và suy nghĩ của người dùng khi tương tác với sản phẩm", "D. Khi cần kiểm tra tốc độ tải trang"], ans: [0, 2] },
  { q: "A/B Testing là gì trong UX Research?", opts: ["A. So sánh hai phiên bản của một giao diện để xem phiên bản nào hoạt động tốt hơn", "B. Phương pháp phân tích phản hồi định tính của người dùng", "C. Chỉ được sử dụng trong nghiên cứu thị trường, không liên quan đến UX", "D. Một kỹ thuật kiểm tra mã nguồn trong quá trình phát triển sản phẩm"], ans: [0] },
  { q: "Khi phân tích dữ liệu từ UX Research, những yếu tố nào quan trọng nhất?", opts: ["A. Số lượng mẫu đủ lớn để kết luận có ý nghĩa thống kê", "B. Dữ liệu phải thể hiện đúng hành vi của người dùng thực tế", "C. Dữ liệu chỉ nên tập trung vào người dùng có trải nghiệm tích cực", "D. Không cần kiểm tra tính chính xác của dữ liệu"], ans: [0, 1] },
  { q: "Persona trong UX Research là gì?", opts: ["A. Mô hình đại diện cho một nhóm người dùng điển hình", "B. Một loại kiểm thử UX đặc biệt", "C. Một công cụ để đo lường hiệu suất của trang web", "D. Một phương pháp thiết kế đồ họa giao diện người dùng"], ans: [0] },
  { q: "UX Research quan trọng nhất ở giai đoạn nào trong quy trình thiết kế sản phẩm?", opts: ["A. Giai đoạn nghiên cứu và lập kế hoạch ban đầu", "B. Giai đoạn phát triển sản phẩm", "C. Chỉ cần thực hiện sau khi sản phẩm đã hoàn thiện", "D. Chỉ áp dụng khi sản phẩm gặp vấn đề với người dùng"], ans: [0] },
  { q: "Trong phương pháp Design Thinking, bước nào sau đây giúp hiểu rõ nhu cầu và mong muốn thực sự của người dùng?", opts: ["A. Define (Xác định vấn đề)", "B. Ideate (Tạo ý tưởng)", "C. Empathize (Thấu hiểu)", "D. Prototype (Tạo nguyên mẫu)"], ans: [2] },
  { q: "Trong Design Thinking, giai đoạn nào tập trung vào việc tổng hợp dữ liệu thu thập được để xác định vấn đề cần giải quyết?", opts: ["A. Test (Kiểm thử)", "B. Define (Xác định vấn đề)", "C. Empathize (Thấu hiểu)", "D. Implement (Triển khai)"], ans: [1] },
  { q: "Những đặc điểm nào dưới đây là cốt lõi của tư duy Design Thinking?", opts: ["A. Lấy con người làm trung tâm", "B. Tập trung vào giải pháp ngay từ đầu", "C. Học hỏi từ phản hồi nhanh chóng", "D. Thử nghiệm và chấp nhận rủi ro"], ans: [0, 2, 3] },
  { q: "Trong quá trình tạo ý tưởng (Ideate), điều nào sau đây không đúng?", opts: ["A. Khuyến khích suy nghĩ sáng tạo, không giới hạn ý tưởng", "B. Đánh giá ngay lập tức tính khả thi của từng ý tưởng", "C. Có thể sử dụng kỹ thuật Brainstorming (Động não)", "D. Chấp nhận cả những ý tưởng điên rồ"], ans: [1] },
  { q: "Nguyên mẫu (Prototype) trong Design Thinking nên có đặc điểm nào?", opts: ["A. Phải là một sản phẩm hoàn thiện", "B. Phải có đầy đủ chức năng trước khi thử nghiệm", "C. Có thể là một bản vẽ, mô hình, hoặc bản demo", "D. Được tạo ra với mục đích kiểm tra và điều chỉnh ý tưởng"], ans: [2, 3] },
  { q: "Giai đoạn nào trong Design Thinking giúp xác minh xem giải pháp có thực sự giải quyết vấn đề của người dùng không?", opts: ["A. Define (Xác định vấn đề)", "B. Ideate (Tạo ý tưởng)", "C. Test (Kiểm thử)", "D. Implement (Triển khai)"], ans: [2] },
  { q: "Tại sao việc thử nghiệm (Test) lại quan trọng trong Design Thinking?", opts: ["A. Giúp thu thập phản hồi từ người dùng thực tế", "B. Giúp xác định các điểm cần cải thiện của giải pháp", "C. Giúp giảm thời gian phát triển sản phẩm", "D. Là bước cuối cùng nên không thể thay đổi giải pháp"], ans: [0, 1] },
  { q: "Khi thực hiện nghiên cứu trong giai đoạn Empathize, phương pháp nào sau đây là phổ biến?", opts: ["A. Quan sát hành vi của người dùng", "B. Phỏng vấn người dùng", "C. Tạo sản phẩm thử nghiệm", "D. Phân tích dữ liệu thống kê"], ans: [0, 1] },
  { q: "Trong Design Thinking, một nhóm đa ngành (cross-functional team) có lợi ích gì?", opts: ["A. Mang đến nhiều góc nhìn khác nhau về vấn đề", "B. Giúp quá trình thử nghiệm diễn ra nhanh hơn", "C. Giảm chi phí phát triển sản phẩm", "D. Giúp đưa ra giải pháp sáng tạo và toàn diện hơn"], ans: [0, 3] },
  { q: "Yếu tố nào sau đây giúp tối ưu hóa quá trình Design Thinking?", opts: ["A. Lặp lại các giai đoạn nếu cần thiết", "B. Chỉ thử nghiệm một lần để tiết kiệm thời gian", "C. Tập trung vào công nghệ thay vì nhu cầu người dùng", "D. Cố gắng tìm ra một giải pháp duy nhất ngay từ đầu"], ans: [0] }
].map((item, idx) => ({ ...item, id: idx + 1 }));

const txtSavedRawData = newRawData.map(item => ({ ...item }));

const quizSetsSeed = [
  { id: 'old', description: 'Bộ câu hỏi gốc', data: oldRawData },
  { id: 'new', description: 'Bộ câu hỏi mới', data: newRawData },
  { id: 'txt', description: 'Bộ câu hỏi từ text.txt (đã lưu)', data: txtSavedRawData },
  { id: 'txt-latest', description: 'Bộ câu hỏi từ text.txt (mới nhất)', data: txtLatestRawData }
];

const quizSets = quizSetsSeed.map((set, index) => ({
  ...set,
  title: `C${index + 1}-VA`
}));

const isCorrect = (userAns, correctAns) => {
  if (!userAns || userAns.length === 0) return false;
  if (userAns.length !== correctAns.length) return false;
  const sortedUser = [...userAns].sort();
  const sortedCorrect = [...correctAns].sort();
  return sortedUser.every((val, index) => val === sortedCorrect[index]);
};

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Xác nhận", cancelText = "Hủy" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button onClick={onCancel} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const QuizScreen = ({ quiz, onBack }) => {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', type: '' });
  const data = quiz.data;

  const handleOptionChange = (questionId, optionIndex, isMultiple) => {
    if (isSubmitted) return;
    setAnswers(prev => {
      if (!isMultiple) return { ...prev, [questionId]: [optionIndex] };
      const current = prev[questionId] || [];
      if (current.includes(optionIndex)) return { ...prev, [questionId]: current.filter(i => i !== optionIndex) };
      return { ...prev, [questionId]: [...current, optionIndex] };
    });
  };

  const scrollToQuestion = (id) => {
    const el = document.getElementById(`question-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setIsMenuOpen(false);
  };

  const handleRequestSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < data.length) {
      setModalConfig({
        isOpen: true,
        title: 'Chưa hoàn thành',
        message: `Bạn mới làm được ${answeredCount}/${data.length} câu. Bạn có chắc chắn muốn nộp bài không?`,
        type: 'submit',
        confirmText: 'Nộp bài',
        cancelText: 'Tiếp tục làm'
      });
      return;
    }
    setModalConfig({
      isOpen: true,
      title: 'Xác nhận nộp bài',
      message: 'Bạn có chắc chắn muốn nộp bài thi này?',
      type: 'submit',
      confirmText: 'Nộp bài',
      cancelText: 'Hủy'
    });
  };

  const handleRequestRetry = () => {
    setModalConfig({
      isOpen: true,
      title: 'Làm lại từ đầu',
      message: 'Bạn có muốn làm lại từ đầu? Mọi kết quả hiện tại sẽ bị xóa sạch.',
      type: 'retry',
      confirmText: 'Làm lại',
      cancelText: 'Hủy'
    });
  };

  const handleConfirmModal = () => {
    if (modalConfig.type === 'submit') {
      setIsSubmitted(true);
      let currentScore = 0;
      data.forEach(q => { if (isCorrect(answers[q.id], q.ans)) currentScore++; });
      setScore(currentScore);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (modalConfig.type === 'retry') {
      setAnswers({});
      setIsSubmitted(false);
      setScore(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / data.length) * 100;

  const QuestionGrid = () => (
    <div className="grid grid-cols-5 gap-2 max-h-[45vh] md:max-h-[55vh] overflow-y-auto mb-4 p-1 custom-scrollbar">
      {data.map(q => {
        const isAnswered = answers[q.id] && answers[q.id].length > 0;
        const isRight = isCorrect(answers[q.id], q.ans);
        let btnClass = "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
        if (!isSubmitted && isAnswered) btnClass = "bg-blue-600 text-white border-blue-600";
        if (isSubmitted && isRight) btnClass = "bg-green-500 text-white border-green-500";
        if (isSubmitted && isAnswered && !isRight) btnClass = "bg-red-500 text-white border-red-500";
        if (isSubmitted && !isAnswered) btnClass = "bg-gray-100 text-gray-400 border-gray-200";
        return (
          <button key={q.id} onClick={() => scrollToQuestion(q.id)} className={`w-9 h-9 sm:w-10 sm:h-10 rounded border text-sm font-medium flex items-center justify-center transition-colors ${btnClass}`}>
            {q.id}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 pb-20 md:pb-8">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
      `}</style>

      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          <button onClick={onBack} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center space-x-2">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Quay lại</span>
          </button>
          <h1 className="font-bold text-lg sm:text-xl text-blue-700 truncate">{quiz.title}</h1>
          {isSubmitted ? (
            <div className="font-bold text-sm sm:text-lg text-green-600 px-3 py-1 bg-green-50 rounded-lg whitespace-nowrap">
              Điểm: <span className="text-lg sm:text-2xl">{score}</span>/{data.length}
            </div>
          ) : (
            <div className="w-[86px] sm:w-[130px]" />
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 relative">
        <div className="md:col-span-8 lg:col-span-9">
          {isSubmitted && (
            <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 mb-8 text-center animate-in fade-in slide-in-from-top-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} strokeWidth={3} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Kết quả bài làm</h2>
              <div className="text-4xl font-bold text-blue-600 mb-2">{score} <span className="text-xl text-gray-500">/ {data.length}</span></div>
              <p className="text-gray-600">Bạn đã trả lời đúng {score} trên tổng số {data.length} câu hỏi.</p>
            </div>
          )}

          {data.map((q) => {
            const userAns = answers[q.id] || [];
            const isAnsMultiple = q.ans.length > 1;
            const isRight = isCorrect(userAns, q.ans);
            return (
              <div id={`question-${q.id}`} key={q.id} className={`bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 scroll-mt-24 transition-colors ${isSubmitted ? (isRight ? 'border-green-300 bg-green-50/20' : 'border-red-300 bg-red-50/20') : 'border-gray-200'}`}>
                <div className="flex space-x-3 sm:space-x-4 mb-4">
                  <div className={`font-bold flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${isSubmitted ? (isRight ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') : 'bg-blue-100 text-blue-700'}`}>
                    {q.id}
                  </div>
                  <h2 className="text-gray-800 font-semibold text-base sm:text-lg pt-1 leading-snug">
                    {q.q}
                    {isAnsMultiple && <span className="ml-2 text-sm font-normal text-amber-600 italic inline-block mt-1 sm:mt-0">(Chọn nhiều đáp án)</span>}
                  </h2>
                </div>
                <div className="space-y-3 pl-11 sm:pl-14">
                  {q.opts.map((opt, idx) => {
                    const isSelected = userAns.includes(idx);
                    const isCorrectAns = q.ans.includes(idx);
                    let statusClass = "border-gray-200 hover:bg-gray-50";
                    let iconClass = "border-gray-400 bg-white";
                    let textColor = "text-gray-800";
                    if (!isSubmitted) {
                      if (isSelected) {
                        statusClass = "bg-blue-50 border-blue-400";
                        iconClass = "border-blue-500 bg-blue-500 text-white";
                        textColor = "text-blue-900 font-medium";
                      }
                    } else if (isCorrectAns) {
                      statusClass = "bg-green-50 border-green-500";
                      iconClass = "border-green-500 bg-green-500 text-white";
                      textColor = "text-green-900 font-medium";
                    } else if (isSelected && !isCorrectAns) {
                      statusClass = "bg-red-50 border-red-400";
                      iconClass = "border-red-500 bg-red-500 text-white";
                      textColor = "text-red-900 line-through opacity-70";
                    } else {
                      statusClass = "border-gray-200 opacity-50";
                      iconClass = "border-gray-300 bg-gray-100";
                    }

                    return (
                      <div key={idx} onClick={() => handleOptionChange(q.id, idx, isAnsMultiple)} className={`p-3 border rounded-lg transition-all flex items-start space-x-3 select-none ${statusClass} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}>
                        <div className={`mt-0.5 w-5 h-5 flex-shrink-0 flex items-center justify-center border ${isAnsMultiple ? 'rounded' : 'rounded-full'} ${iconClass}`}>
                          {!isSubmitted && isSelected && !isAnsMultiple && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                          {!isSubmitted && isSelected && isAnsMultiple && <Check size={14} strokeWidth={3} />}
                          {isSubmitted && isCorrectAns && <Check size={14} strokeWidth={3} />}
                          {isSubmitted && isSelected && !isCorrectAns && <XIcon size={14} strokeWidth={3} />}
                        </div>
                        <div className={`${textColor} text-sm sm:text-base leading-snug`}>{opt}</div>
                      </div>
                    );
                  })}
                </div>

                {isSubmitted && !isRight && (
                  <div className="mt-5 pl-11 sm:pl-14 animate-in fade-in">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start space-x-2 text-amber-900 text-sm sm:text-base">
                      <AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-amber-600" />
                      <div>
                        <span className="font-semibold block mb-1">Đáp án đúng là:</span>
                        <ul className="list-disc pl-4 space-y-1">
                          {q.ans.map(ansIdx => <li key={ansIdx}>{q.opts[ansIdx]}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden md:block md:col-span-4 lg:col-span-3">
          <div className="sticky top-24 bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="text-center mb-5 pb-5 border-b border-gray-100">
              <div className="text-sm text-gray-500 mb-1 flex items-center justify-center space-x-1">
                <Clock size={16} />
                <span>Thời gian làm bài</span>
              </div>
              <div className="text-xl font-bold text-gray-800">Không giới hạn</div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2 font-semibold text-gray-700">
                <span>Tiến độ làm bài:</span>
                <span className={answeredCount === data.length ? 'text-green-600' : ''}>{answeredCount}/{data.length}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
            <QuestionGrid />
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              {!isSubmitted ? (
                <button onClick={handleRequestSubmit} className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-sm hover:shadow">NỘP BÀI</button>
              ) : (
                <button onClick={handleRequestRetry} className="w-full py-3.5 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-900 transition shadow-sm flex items-center justify-center space-x-2">
                  <RefreshCw size={18} />
                  <span>LÀM LẠI</span>
                </button>
              )}
              <button onClick={onBack} className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
                Quay lại chọn bộ câu hỏi
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-between items-center shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-40">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Đã làm</span>
          <span className="font-bold text-blue-700 text-lg leading-none">{answeredCount}/{data.length}</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={onBack} className="px-3 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-bold">Quay lại</button>
          <button onClick={() => setIsMenuOpen(true)} className="p-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"><Menu size={20} /></button>
          {!isSubmitted ? (
            <button onClick={handleRequestSubmit} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-bold shadow-sm">Nộp bài</button>
          ) : (
            <button onClick={handleRequestRetry} className="px-5 py-2.5 bg-gray-800 text-white rounded-lg font-bold shadow-sm flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>Làm lại</span>
            </button>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex flex-col justify-end">
          <div className="bg-white p-5 rounded-t-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-8 duration-200">
            <div className="flex justify-between items-center mb-5 pb-3 border-b">
              <h3 className="font-bold text-lg">Danh sách câu hỏi</h3>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"><XIcon size={24} /></button>
            </div>
            <QuestionGrid />
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        onConfirm={handleConfirmModal}
        onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
};

export default function App() {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const selectedQuiz = quizSets.find(set => set.id === selectedQuizId) || null;

  useEffect(() => {
    document.title = selectedQuiz ? selectedQuiz.title : "Đề kiểm tra UI/UX Design";
  }, [selectedQuiz]);

  if (selectedQuiz) {
    return <QuizScreen quiz={selectedQuiz} onBack={() => setSelectedQuizId(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-3">Đề kiểm tra UI/UX Design</h1>
          <p className="text-gray-600">Vui lòng chọn bộ câu hỏi trước khi bắt đầu làm bài.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quizSets.map(quiz => (
            <button key={quiz.id} onClick={() => setSelectedQuizId(quiz.id)} className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md rounded-xl p-6 text-left transition-all">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{quiz.title}</h2>
              <div className="text-sm text-gray-500 mb-2">{quiz.description}</div>
              <div className="text-blue-700 font-semibold">{quiz.data.length} câu hỏi</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
