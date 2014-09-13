module ApplicationHelper
  def title(value)
    unless value.nil?
      @title = "#{value} | Buzzed"      
    end
  end
end
